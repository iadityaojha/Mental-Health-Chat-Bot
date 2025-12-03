from fastapi import APIRouter, Query
from services.geo.helpline_finder import helpline_finder
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class Helpline(BaseModel):
    id: str
    name: str
    phone: str
    type: str
    lat: float
    lon: float
    gov_affiliated: bool
    distance_km: Optional[float] = None

@router.get("/", response_model=List[Helpline])
async def get_helplines(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    radius_km: float = Query(50.0, description="Search radius in km")
):
    results = helpline_finder.find_nearby(lat, lon, radius_km)
    return results

import pytest
from services.safety.safety_filter import safety_filter
from services.geo.helpline_finder import helpline_finder

def test_safety_filter_safe():
    result = safety_filter.check_safety("I am feeling a bit sad today.")
    assert result["is_safe"] == True
    assert result["risk_level"] == "low"

def test_safety_filter_unsafe():
    result = safety_filter.check_safety("I want to kill myself")
    assert result["is_safe"] == False
    assert result["risk_level"] == "high"
    assert len(result["actions"]) > 0

def test_helpline_finder():
    # Test San Francisco coordinates
    results = helpline_finder.find_nearby(37.7749, -122.4194, radius_km=10)
    assert len(results) >= 1
    assert results[0]["name"] == "National Suicide Prevention Lifeline"

def test_helpline_finder_far():
    # Test location far from any helpline
    results = helpline_finder.find_nearby(0, 0, radius_km=10)
    assert len(results) == 0

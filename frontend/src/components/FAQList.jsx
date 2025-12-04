import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    { question: "What should I do when I feel anxious?", answer: "Try slow breathing: inhale for 4 seconds, hold for 2, exhale for 6. You’re not alone—I'm here to help you feel grounded." },
    { question: "How can I reduce exam stress?", answer: "Break your study tasks into small chunks. Study for 25 minutes and take a 5-minute break. Small steps make big progress." },
    { question: "Why can't I focus while studying?", answer: "Your mind may be overwhelmed. Start with just 10 minutes of focused work. Once you begin, focus improves naturally." },
    { question: "I can't sleep. What can help?", answer: "Avoid screens 30 minutes before bed, dim your lights, and try slow breathing. I can guide you through a short calming exercise." },
    { question: "Why do I feel sad even without a reason?", answer: "It’s normal to feel this way sometimes. Emotions don’t always need a trigger. Talking about your day can help you understand the feeling." },
    { question: "How can I calm myself when overwhelmed?", answer: "Pause, breathe slowly, and identify what’s causing stress. Taking things one step at a time makes it easier to manage." },
    { question: "What can I do if I feel lonely?", answer: "Loneliness is tough. Try reaching out to one person you trust. And remember—I'm here to listen whenever you need." },
    { question: "How do I stop overthinking?", answer: "Try grounding: name 3 things you see, 2 things you can touch, and 1 thing you hear. This helps bring your mind back to the present." },
    { question: "Why do I feel like I'm not good enough?", answer: "Many students feel this way, but your worth isn't defined by mistakes or grades. You’re growing every day, even if you don’t notice it." },
    { question: "How can I increase my motivation?", answer: "Start small—really small. Even 2 minutes of effort counts. Momentum builds once you begin." },
    { question: "What should I do when I feel a panic attack coming?", answer: "You’re safe. Focus on slow breathing: inhale 4 seconds, exhale 6 seconds. I'm here with you through this moment." },
    { question: "How can I deal with exam fear?", answer: "Break the syllabus into mini-goals. When you know exactly what to study, fear reduces. I can help you make a plan." },
    { question: "Why do I forget things after studying?", answer: "Try spaced repetition and teaching concepts aloud. These techniques improve memory more effectively than rereading." },
    { question: "How can I take better care of my mental health?", answer: "Start with basics: good sleep, hydration, small breaks, gentle movement, and talking about your feelings. Little habits have big effects." },
    { question: "Is it normal to feel lost in life?", answer: "Yes—many students experience this. You don’t need to figure everything out right away. Taking small steps helps create clarity." },
];

const FAQList = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="h-full overflow-y-auto p-6 custom-scrollbar bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
                        <p className="text-gray-500">Common questions and helpful answers for your mental well-being.</p>
                    </div>
                </div>

                <div className="space-y-4 pb-10">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                            <button
                                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-medium text-gray-800 text-lg">{faq.question}</span>
                                {openIndex === index ? <ChevronUp className="text-indigo-500" /> : <ChevronDown className="text-gray-400" />}
                            </button>
                            {openIndex === index && (
                                <div className="p-5 pt-0 text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQList;

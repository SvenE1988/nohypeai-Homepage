
import React from "react";
import { TestimonialData } from "@/hooks/useWebsiteContent";

interface TestimonialSectionContent {
  title?: string;
  testimonials: TestimonialData[];
  maxDisplay?: number;
}

interface TestimonialSectionProps {
  content: TestimonialSectionContent;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ content }) => {
  const { title = "Kundenfeedback", testimonials, maxDisplay = 2 } = content;
  const displayedTestimonials = testimonials.slice(0, maxDisplay);
  
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-secondary mb-4">{title}</h3>
      
      <div className="space-y-4">
        {displayedTestimonials.map((testimonial, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-start space-x-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-700 italic mb-2">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{testimonial.name}</p>
                  <span className="mx-2 text-gray-400">•</span>
                  <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

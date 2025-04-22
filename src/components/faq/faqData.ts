
import React from 'react';

// Define the structure of our FAQ data
export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

// Re-export the existing FAQ data
export { default } from './faqData';

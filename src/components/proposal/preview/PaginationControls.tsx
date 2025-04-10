
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show (show max 5 page numbers)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than the max, show all of them
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Otherwise, show a subset focused around the current page
      let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);
      
      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(0, endPage - maxPageButtons + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center my-4 bg-black/20 rounded-lg p-2 print:hidden">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
              className={`${currentPage === 0 ? "pointer-events-none opacity-50" : ""} text-black dark:text-white`}
              aria-label="Vorherige Seite"
            />
          </PaginationItem>
          
          {getPageNumbers().map((index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                isActive={currentPage === index} 
                onClick={() => onPageChange(index)}
                className={`${currentPage === index ? "bg-primary text-white" : "text-black dark:text-white"}`}
                aria-label={`Seite ${index + 1}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
              className={`${currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""} text-black dark:text-white`}
              aria-label="Nächste Seite"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

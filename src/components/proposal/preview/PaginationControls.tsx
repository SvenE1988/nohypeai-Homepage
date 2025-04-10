
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

  return (
    <div className="flex justify-center my-6 print:hidden">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
              className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                isActive={currentPage === index} 
                onClick={() => onPageChange(index)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
              className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

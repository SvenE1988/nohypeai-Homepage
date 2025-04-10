
import React from "react";
import { Button } from "@/components/ui/button";
import { Book, Copy, Trash2, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PageRenderer } from "../preview/PageRenderer";

interface PageControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  useCoverPage: boolean;
  pagesCount: number;
  duplicatePage: () => void;
  deletePage: () => void;
  addNewPage: () => void;
  currentPageSections: any[];
}

export const PageControls: React.FC<PageControlsProps> = ({ 
  currentPage, 
  setCurrentPage, 
  useCoverPage, 
  pagesCount, 
  duplicatePage, 
  deletePage, 
  addNewPage, 
  currentPageSections 
}) => {
  return (
    <div className="bg-black/50 p-4 rounded-lg border border-white/10">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center">
          <h3 className="text-white font-medium">Seite {currentPage + 1} von {useCoverPage ? pagesCount + 1 : pagesCount}</h3>
          
          <div className="hidden sm:flex ml-4 space-x-2">
            {useCoverPage && (
              <Button
                key="cover"
                variant={currentPage === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(0)}
                className="w-8 h-8 p-0"
              >
                <Book size={14} />
              </Button>
            )}
            
            {Array.from({ length: pagesCount }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === (useCoverPage ? index + 1 : index) ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(useCoverPage ? index + 1 : index)}
                className="w-8 h-8 p-0"
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addNewPage}
              className="w-8 h-8 p-0"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={duplicatePage}
            className="text-gray-900 bg-white hover:bg-gray-100"
            disabled={useCoverPage && currentPage === 0}
          >
            <Copy size={16} className="mr-1" /> Duplizieren
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={deletePage}
            className="text-red-500"
            disabled={(useCoverPage && currentPage === 0) || pagesCount <= 1}
          >
            <Trash2 size={16} className="mr-1" /> Löschen
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="default" 
                size="sm" 
                className="sm:hidden"
              >
                Vorschau
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-lg overflow-auto">
              <div className="pt-6">
                {useCoverPage && currentPage === 0 ? (
                  <PageRenderer 
                    sections={[]} 
                    pageIndex={0}
                    scale={0.7}
                    isCoverPage={true}
                  />
                ) : (
                  <PageRenderer 
                    sections={currentPageSections} 
                    pageIndex={currentPage}
                    scale={0.7}
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="flex overflow-x-auto py-2 mt-2 sm:hidden gap-1">
        {useCoverPage && (
          <Button
            key="cover-mobile"
            variant={currentPage === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(0)}
            className="w-8 h-8 p-0 flex-shrink-0"
          >
            <Book size={14} />
          </Button>
        )}
        
        {Array.from({ length: pagesCount }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === (useCoverPage ? index + 1 : index) ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(useCoverPage ? index + 1 : index)}
            className="w-8 h-8 p-0 flex-shrink-0"
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={addNewPage}
          className="w-8 h-8 p-0 flex-shrink-0"
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
};

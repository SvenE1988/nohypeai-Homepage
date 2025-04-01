
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";
import { Project } from "./types";

interface ProjectCarouselProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
}

const ProjectCarousel = ({ projects, onViewDetails }: ProjectCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Optimize scroll detection
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    
    const inView: number[] = [];
    const slides = emblaApi.slideNodes();
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const rect = slide.getBoundingClientRect();
      
      if (rect.left < window.innerWidth && rect.right > 0) {
        inView.push(i);
      }
    }
    
    setSlidesInView(inView);
  }, [emblaApi]);
  
  // Optimize selection tracking
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  
  // Setup event listeners
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    onScroll();
    
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);
  
  // Optimize autoplay
  useEffect(() => {
    if (!emblaApi) return;
    
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        if (emblaApi && document.visibilityState === 'visible') {
          emblaApi.scrollNext();
        }
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    
    startAutoplay();
    
    // Pause on pointer events
    emblaApi.on('pointerDown', stopAutoplay);
    emblaApi.on('pointerUp', startAutoplay);
    
    // Pause when tab not visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      stopAutoplay();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (emblaApi) {
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('pointerUp', startAutoplay);
      }
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex py-6 md:py-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_40%] min-w-0 pl-4 transition-all duration-500 ease-out"
            >
              <ProjectCard
                project={project}
                isActive={selectedIndex === index}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
        <button 
          onClick={() => emblaApi?.scrollPrev()} 
          className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 inline-flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300",
                selectedIndex === index 
                  ? "bg-primary scale-125" 
                  : "bg-gray-600 hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={() => emblaApi?.scrollNext()}
          className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-primary/50 bg-black/50 backdrop-blur-sm text-primary hover:bg-primary/20 inline-flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;


import { cn } from "@/lib/utils";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos: Logo[];
  className?: string;
}

export function Logos3({ 
  heading, 
  logos,
  className,
}: Logos3Props) {
  return (
    <div className={cn("py-8 bg-black/40 backdrop-blur-sm border-y border-white/10", className)}>
      <div className="container px-4 mx-auto">
        {heading && (
          <h2 className="text-center text-lg font-medium text-gray-300 mb-8">
            {heading}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 items-center">
          {logos.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center">
              <img
                src={logo.image}
                alt={logo.description}
                className={cn("opacity-70 hover:opacity-100 transition-opacity", logo.className)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

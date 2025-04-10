
import { useCallToAction } from "@/hooks/useCallToAction";

const Partners = () => {
  const { openCalendarBooking } = useCallToAction();
  
  return (
    <section id="partnerprojekte" className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-gray-400 text-center mb-12 text-lg font-normal">Unsere Partner</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="group relative flex items-center justify-center min-w-[140px] md:min-w-[160px]">
              <div className="relative w-full aspect-[3/1]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {index === 1 ? (
                    <img 
                      src="/lovable-uploads/411e0ec7-a024-4752-ad5e-f20b65973d93.png"
                      alt="Partner logo" 
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {['n8n', 'make', 'Vapi', 'Voiceflow', 'Superchat', 'Pipedrive'][index - 1]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

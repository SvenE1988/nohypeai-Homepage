import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Daniel Müller",
    role: "CEO",
    company: "Kraftwerk Fitness",
    content: "Die Zusammenarbeit mit Fastlane AI war großartig! Unser Instagram-Chatbot beantwortet jetzt automatisch DMs, schnell und professionell. Das Team hat unsere Wünsche perfekt umgesetzt, und wir sind absolut zufrieden. Klare Empfehlung!",
    image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png",
  },
  {
    name: "Elke Schwarz",
    role: "CEO",
    company: "OrangeSalamander",
    content: "Die KI-E-Mail-Automatisierung von Fastlane AI hat uns überzeugt! Die Abstimmung war schnell und effizient, die Kommunikation immer klar und angenehm. Ein Top-Ergebnis – absolut empfehlenswert!",
    image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <span className="text-primary mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Das sagen unsere Kunden
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-[#1a1f35] rounded-xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role} {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;

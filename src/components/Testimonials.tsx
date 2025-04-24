import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}
const testimonials: Testimonial[] = [{
  name: "Daniel Müller",
  role: "CEO",
  company: "Kraftwerk Fitness",
  content: "Die Zusammenarbeit mit Fastlane AI war großartig! Unser Instagram-Chatbot beantwortet jetzt automatisch DMs, schnell und professionell. Das Team hat unsere Wünsche perfekt umgesetzt, und wir sind absolut zufrieden. Klare Empfehlung!",
  image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png"
}, {
  name: "Elke Schwarz",
  role: "CEO",
  company: "OrangeSalamander",
  content: "Die KI-E-Mail-Automatisierung von Fastlane AI hat uns überzeugt! Die Abstimmung war schnell und effizient, die Kommunikation immer klar und angenehm. Ein Top-Ergebnis – absolut empfehlenswert!",
  image: "/lovable-uploads/4f43975f-80a5-44a1-9c89-6daefbed2a9e.png"
}];
const Testimonials = () => {
  return <section id="testimonials" className="py-20 bg-black">
      
    </section>;
};
export default Testimonials;
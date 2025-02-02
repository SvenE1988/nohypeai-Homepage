import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "Wie lange dauert die Implementierung?",
      answer: "Die Implementierungszeit variiert je nach Projekt, liegt aber typischerweise zwischen 2-6 Wochen. Wir arbeiten agil und liefern erste Ergebnisse bereits nach wenigen Tagen."
    },
    {
      question: "Welche Vorkenntnisse brauchen wir?",
      answer: "Keine speziellen KI-Vorkenntnisse erforderlich. Wir begleiten Sie von der Konzeption bis zur erfolgreichen Umsetzung und schulen Ihr Team."
    },
    {
      question: "Wie sicher ist die KI-Lösung?",
      answer: "Wir setzen auf modernste Sicherheitsstandards und DSGVO-konforme Lösungen. Ihre Daten werden ausschließlich in deutschen Rechenzentren verarbeitet."
    },
    {
      question: "Was kostet die Implementierung?",
      answer: "Die Kosten richten sich nach Ihren spezifischen Anforderungen. Wir bieten transparente Festpreise und garantieren eine positive ROI innerhalb der ersten 6 Monate."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Häufig gestellte Fragen</h2>
          <p className="text-gray-400">Finden Sie schnell Antworten auf Ihre Fragen</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="border border-white/10 rounded-lg bg-black/20">
                <AccordionTrigger className="px-6 text-white hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

import { ArrowLeft, BookOpen, Calendar, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
}

interface BlogSection {
  category: string;
  posts: BlogPost[];
}

const Blog = () => {
  const blogPosts: BlogSection[] = [
    {
      category: "Praxistipps",
      posts: [
        {
          title: "KI für kleine und mittelständische Unternehmen: Praktische Anwendungsfälle und Vorteile",
          excerpt: "Ein Überblick darüber, wie KMUs durch gezielte KI-Anwendungen profitieren und ihre Prozesse effizienter gestalten können.",
          date: "18. Juli 2024",
          category: "Praxistipps",
          tags: ["KI", "KMU", "Digitalisierung", "Praxisbeispiele"]
        },
        {
          title: "Wie läuft ein KI-Projekt mit noHype AI ab? Persönliche Insights von noHype-Gründer Sven",
          excerpt: "Erfahre Schritt für Schritt, wie KI-Projekte erfolgreich umgesetzt werden – mit ehrlichen Einblicken vom Gründer Sven und dem Gedanken hinter noHype AI.",
          date: "5. August 2024",
          category: "Praxistipps",
          tags: ["KI-Projekte", "noHype AI", "Zusammenarbeit", "Insights"]
        },
        {
          title: "Erfolgreiche Einführung von KI-Lösungen: Tipps aus der Praxis",
          excerpt: "Praktische Ratschläge für die erfolgreiche Einführung und Nutzung von KI.",
          date: "27. März 2025",
          category: "Praxistipps",
          tags: ["KI-Lösungen", "Praxis", "Implementierung"]
        }
      ],
    },
    {
      category: "Case Studies",
      posts: [
        {
          title: "Dynamische Chatbots für eine bessere Kundeninteraktion (Purainvest)",
          excerpt: "Wie dynamische Chatbots Kundenerlebnisse optimieren und interne Prozesse effizienter gestalten.",
          date: "2. September 2024",
          category: "Case Study",
          tags: ["Chatbots", "Kundenerlebnis", "Digitalisierung"]
        },
        {
          title: "Integration von Beraterrechnern für effiziente Immobilienfinanzierung (Purainvest)",
          excerpt: "Automatisierte Kundenrechner erleichtern Prozesse und steigern die Zufriedenheit bei der Immobilienfinanzierung.",
          date: "23. November 2024",
          category: "Case Study",
          tags: ["Automatisierung", "Immobilienfinanzierung", "Effizienz"]
        },
        {
          title: "Automatisierte Angebotserstellung mit SEVDESK: Von 48 Stunden auf wenige Minuten (Wesa-Solar)",
          excerpt: "Erfahre, wie Automatisierung administrative Prozesse beschleunigt und Vertriebseffizienz steigert.",
          date: "21. Januar 2025",
          category: "Case Study",
          tags: ["Automatisierung", "Angebotserstellung", "SEVDESK"]
        },
        {
          title: "Voice-Agenten im Vertrieb: Automatische Qualifizierung und Terminvereinbarung (Wesa-Solar)",
          excerpt: "Automatisierte Sprachassistenten als Schlüssel zur Effizienzsteigerung im Vertrieb kleiner und mittlerer Unternehmen.",
          date: "14. Februar 2025",
          category: "Case Study",
          tags: ["Voice-Agenten", "Vertrieb", "Automatisierung"]
        }
      ],
    },
    {
      category: "Sprachagenten im Focus",
      posts: [
        {
          title: "Warum Sprachagenten der nächste Schritt für KMUs sind",
          excerpt: "Entdecke die Einsatzmöglichkeiten und Vorteile von Sprachagenten.",
          date: "3. März 2025",
          category: "Sprachagenten im Focus",
          tags: ["Sprachagenten", "KMU", "Digitalisierung"]
        },
      ],
    },
  ];

  // Alle Blogartikel sammeln und nach Datum sortieren (neueste zuerst)
  const allPosts = blogPosts.flatMap(section => section.posts);
  
  // Verbesserte Datum-Parsing-Funktion
  const parseDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('. ');
      if (parts.length !== 3) {
        console.error(`Ungültiges Datumsformat: ${dateStr}`);
        return new Date(0); // Fallback zu Unix Epoch
      }
      
      const day = parseInt(parts[0]);
      const monthMap: {[key: string]: number} = {
        "Januar": 0, "Februar": 1, "März": 2, "April": 3, "Mai": 4, "Juni": 5,
        "Juli": 6, "August": 7, "September": 8, "Oktober": 9, "November": 10, "Dezember": 11
      };
      const month = monthMap[parts[1]];
      const year = parseInt(parts[2]);
      
      if (isNaN(day) || month === undefined || isNaN(year)) {
        console.error(`Fehler beim Parsen des Datums: ${dateStr}, Tag: ${day}, Monat: ${month}, Jahr: ${year}`);
        return new Date(0);
      }
      
      return new Date(year, month, day);
    } catch (error) {
      console.error(`Fehler beim Parsen des Datums "${dateStr}":`, error);
      return new Date(0);
    }
  };

  // Nach Datum sortieren (neueste zuerst)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Die neuesten 3 Artikel
  const latestPosts = sortedPosts.slice(0, 3);
  
  // Console.log zur Überprüfung (für Debugging)
  console.log("Sortierte Artikel (neueste zuerst):", 
    sortedPosts.map(post => ({
      title: post.title,
      date: post.date,
      parsed: parseDate(post.date).toLocaleString()
    }))
  );
  console.log("Neueste 3 Artikel:", 
    latestPosts.map(post => ({
      title: post.title,
      date: post.date
    }))
  );

  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center gap-4 mb-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Hauptseite
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-white">Blog</h1>
        </div>

        {/* Neueste Blogartikel Sektion */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-white">Neueste Blogartikel</h2>
          </div>
          
          <Card className="border-0 bg-transparent">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-8">
                {latestPosts.map((post, index) => (
                  <article 
                    key={index}
                    className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <time className="text-sm text-primary">{post.date}</time>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="bg-white/5 text-primary/90 hover:bg-white/10 border-primary/20 text-xs"
                        >
                          <Tag className="mr-1 w-3 h-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <button className="text-primary hover:text-white transition-colors self-start mt-auto group flex items-center">
                      Weiterlesen
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-20">
          {blogPosts.map((section, index) => (
            <div key={index} className="relative">
              <h2 className="text-2xl font-semibold text-white mb-8 inline-block">
                {section.category}
                <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-primary"></span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.posts.map((post, postIndex) => (
                  <article 
                    key={postIndex}
                    className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <time className="text-sm text-primary">{post.date}</time>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="bg-white/5 text-primary/90 hover:bg-white/10 border-primary/20 text-xs"
                        >
                          <Tag className="mr-1 w-3 h-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <button className="text-primary hover:text-white transition-colors self-start mt-auto group flex items-center">
                      Weiterlesen
                      <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

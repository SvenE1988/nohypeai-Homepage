
import { ArrowLeft, Calendar, Tag, Share2, Clock } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { blogPosts } from "@/data/blogData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/neon-button";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Alle Artikel sammeln
  const allPosts = blogPosts.flatMap(section => section.posts);
  
  // Artikel mit dem angegebenen Slug finden
  const post = allPosts.find(post => createSlug(post.title) === slug);
  
  // Wenn kein Artikel gefunden wurde, zur Blog-Übersicht zurückleiten
  if (!post) {
    navigate("/blog");
    return null;
  }
  
  // Geschätzte Lesezeit berechnen (ca. 200 Wörter pro Minute)
  const calculateReadTime = (text: string): number => {
    const wordsPerMinute = 200;
    // Für die Demo nutzen wir die Länge des Excerpts * 5 als Annäherung
    // In Produktion würde man hier den vollen Textinhalt verwenden
    const words = text.length * 5;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };
  
  const readTimeMinutes = calculateReadTime(post.excerpt);
  
  // Funktion zum Kopieren des Artikellinks in die Zwischenablage
  const shareArticle = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast({
          title: "Link kopiert!",
          description: "Der Link wurde in die Zwischenablage kopiert.",
          duration: 3000,
        });
      })
      .catch(err => {
        console.error("Fehler beim Kopieren des Links:", err);
        toast({
          title: "Fehler beim Kopieren",
          description: "Der Link konnte nicht kopiert werden.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  // Hilfsfunktion zum Umwandeln von Plain Text in JSX mit Zeilenumbrüchen und Listen
  const renderContent = (content: string) => {
    // Teile den Text in Absätze
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Überprüfe, ob der Absatz eine Liste enthält
      if (paragraph.includes('- ')) {
        // Dies ist eine Liste
        const listItems = paragraph.split('- ').filter(item => item.trim());
        return (
          <ul key={index} className="list-disc pl-5 mb-4 space-y-2">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-white/80">{item.trim()}</li>
            ))}
          </ul>
        );
      } 
      // Überprüfe auf Überschriften (mit ** markiert)
      else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-white mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      // Standard-Absatz
      else {
        return (
          <p key={index} className="mb-4 text-white/80 leading-relaxed">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/blog" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Blog-Übersicht
          </Link>
          
          <Button 
            onClick={shareArticle}
            className="flex items-center gap-2 text-white/60 hover:text-white"
            variant="ghost"
          >
            <Share2 className="w-5 h-5" />
            Teilen
          </Button>
        </div>

        <article className="max-w-4xl mx-auto bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <time className="text-sm text-primary">{post.date}</time>
            </div>
            
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">{readTimeMinutes} Min. Lesezeit</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, tagIndex) => (
              <Badge 
                key={tagIndex} 
                variant="outline" 
                className="bg-white/5 text-primary/90 hover:bg-white/10 border-primary/20"
              >
                <Tag className="mr-1 w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Artikel-Inhalt mit Formatierung */}
          <div className="text-white/80 leading-relaxed space-y-1">
            {/* Hier den vollständigen Artikelinhalt anzeigen */}
            {post.content ? (
              renderContent(post.content)
            ) : (
              <>
                <p className="text-xl mb-4">{post.excerpt}</p>
                <p className="text-white/60 italic mb-6">
                  Vollständiger Artikelinhalt wird bald verfügbar sein.
                </p>
              </>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

// Hilfsfunktion, um aus einem Titel einen URL-freundlichen Slug zu erstellen
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default BlogPost;

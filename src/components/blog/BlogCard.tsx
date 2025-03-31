
import { Calendar, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogData";
import { Link } from "react-router-dom";
import { createSlug } from "@/pages/BlogPost";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const slug = createSlug(post.title);
  const { toast } = useToast();
  
  // Geschätzte Lesezeit berechnen (ca. 200 Wörter pro Minute)
  const calculateReadTime = (text: string): number => {
    const wordsPerMinute = 200;
    // Für die Demo nutzen wir die Länge des Excerpts * 5 als Annäherung
    // In Produktion würde man hier den vollen Textinhalt verwenden
    const words = text.length * 5;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };
  
  const readTimeMinutes = calculateReadTime(post.excerpt);
  
  // Funktion zum Teilen des Artikels
  const shareArticle = () => {
    const url = `${window.location.origin}/blog/${slug}`;
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
  
  return (
    <article className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <time className="text-sm text-primary">{post.date}</time>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <span className="text-xs">{readTimeMinutes} Min. Lesezeit</span>
        </div>
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
      
      <div className="flex items-center justify-between mt-auto">
        <Link 
          to={`/blog/${slug}`}
          className="text-primary hover:text-white transition-colors self-start group flex items-center"
        >
          Weiterlesen
          <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        
        <Button 
          onClick={shareArticle}
          variant="ghost" 
          size="sm"
          className="p-1 h-auto"
        >
          <Share2 className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
        </Button>
      </div>
    </article>
  );
};

export default BlogCard;

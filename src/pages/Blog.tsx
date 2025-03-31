
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { blogPosts } from "@/data/blogData";
import { parseDate, sortPostsByDate } from "@/utils/dateUtils";
import LatestPosts from "@/components/blog/LatestPosts";
import BlogSection from "@/components/blog/BlogSection";

const Blog = () => {
  // Alle Blogartikel sammeln und nach Datum sortieren (neueste zuerst)
  const allPosts = blogPosts.flatMap(section => section.posts);
  
  // Nach Datum sortieren (neueste zuerst)
  const sortedPosts = sortPostsByDate(allPosts);

  // Die neuesten 3 Artikel
  const latestPosts = sortedPosts.slice(0, 3);
  
  // Console.log zur Überprüfung (für Debugging)
  console.log("Sortierte Artikel (neueste zuerst):", 
    sortedPosts.map(post => ({
      title: post.title,
      date: post.date,
      parsed: parseDate(post.date).toISOString()
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
        <LatestPosts posts={latestPosts} />

        <div className="space-y-20">
          {blogPosts.map((section, index) => (
            <BlogSection 
              key={index} 
              title={section.category} 
              posts={section.posts} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

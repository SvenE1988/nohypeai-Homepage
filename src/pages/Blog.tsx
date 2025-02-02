import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      category: "Neueste Beiträge",
      posts: [
        {
          title: "KI-gestützte Webentwicklung: Die Zukunft des Designs",
          excerpt: "Erfahren Sie, wie künstliche Intelligenz die Webentwicklung revolutioniert...",
          date: "15. März 2024",
        },
        {
          title: "Responsive Design: Best Practices 2024",
          excerpt: "Die wichtigsten Trends und Techniken für modernes responsives Design...",
          date: "10. März 2024",
        },
      ],
    },
    {
      category: "Case Studies",
      posts: [
        {
          title: "Erfolgsgeschichte: Digitale Transformation im Mittelstand",
          excerpt: "Wie ein traditionelles Unternehmen den digitalen Wandel meisterte...",
          date: "5. März 2024",
        },
        {
          title: "E-Commerce Optimierung: +150% Conversion",
          excerpt: "Analyse einer erfolgreichen Shop-Optimierung...",
          date: "1. März 2024",
        },
      ],
    },
    {
      category: "Technologie & Trends",
      posts: [
        {
          title: "Web Performance: Der ultimative Guide",
          excerpt: "Strategien und Tools für schnellere Websites...",
          date: "28. Februar 2024",
        },
        {
          title: "SEO-Strategien für 2024",
          excerpt: "Die neuesten Entwicklungen im Bereich Suchmaschinenoptimierung...",
          date: "25. Februar 2024",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Hauptseite
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-white">Blog</h1>
        </div>

        <div className="space-y-16">
          {blogPosts.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-white mb-6">
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {section.posts.map((post, postIndex) => (
                  <article 
                    key={postIndex}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
                  >
                    <time className="text-sm text-primary">{post.date}</time>
                    <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {post.excerpt}
                    </p>
                    <button className="text-primary hover:text-white transition-colors">
                      Weiterlesen →
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
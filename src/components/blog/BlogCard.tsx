
import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1F35] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
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
  );
};

export default BlogCard;

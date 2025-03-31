
import { BlogPost } from "@/data/blogData";
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  title: string;
  posts: BlogPost[];
}

const BlogSection = ({ title, posts }: BlogSectionProps) => {
  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold text-white mb-8 inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-primary"></span>
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;


import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/data/blogData";
import BlogCard from "./BlogCard";

interface LatestPostsProps {
  posts: BlogPost[];
}

const LatestPosts = ({ posts }: LatestPostsProps) => {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-white">Neueste Blogartikel</h2>
      </div>
      
      <Card className="border-0 bg-transparent">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestPosts;

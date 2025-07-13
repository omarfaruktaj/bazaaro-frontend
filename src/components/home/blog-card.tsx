import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  author: string;
  authorImage?: string;
  date: string;
  category?: string;
  readTime?: string;
}

export default function BlogCard({
  id,
  title,
  description,
  imageUrl,
  link,
  author,
  authorImage = "/public/assets/author.png",
  date,
  category = "General",
  readTime = "5 min read",
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-primary capitalize">
            {category}
          </div>
        )}
      </div>

      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{date}</span>
          </div>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link to={link} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={authorImage || "/placeholder.svg"}
              alt={author}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium text-gray-700">{author}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-primary hover:text-primary/80"
          >
            <Link to={`/blogs/${id}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

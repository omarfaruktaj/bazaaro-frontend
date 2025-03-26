"use client";

import BlogCard from "@/components/home/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "ecommerce", name: "E-Commerce" },
  ];

  const blogs = [
    {
      title: "10 Tips for Starting an Online Business",
      description:
        "Starting an online business can be daunting. Learn 10 essential tips to help you get started the right way.",
      imageUrl:
        "https://i.ibb.co.com/gdm4zSQ/online-business-management-train.png",
      link: "#",
      author: "John Doe",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 25, 2024",
      category: "business",
      readTime: "8 min read",
      featured: true,
    },
    {
      title: "How to Improve Your Website's SEO",
      description:
        "Discover actionable strategies to boost your website's search engine rankings and attract more visitors.",
      imageUrl: "https://i.ibb.co.com/M8cfnrZ/image-14.jpg",
      link: "#",
      author: "Jane Smith",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 20, 2024",
      category: "technology",
      readTime: "6 min read",
      featured: false,
    },
    {
      title: "The Future of E-Commerce in 2025",
      description:
        "Explore the latest trends and technologies shaping the future of online shopping and digital commerce.",
      imageUrl: "https://i.ibb.co.com/j88qg32/image-15.jpg",
      link: "#",
      author: "Emily Johnson",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 15, 2024",
      category: "ecommerce",
      readTime: "10 min read",
      featured: false,
    },
    {
      title: "Building Customer Trust in Digital Marketplaces",
      description:
        "Learn how to establish and maintain customer trust in your online store with proven strategies and best practices.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
      author: "Michael Brown",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 10, 2024",
      category: "business",
      readTime: "7 min read",
      featured: false,
    },
    {
      title: "Mobile Commerce: Optimizing for Smartphone Shoppers",
      description:
        "Discover how to create a seamless mobile shopping experience that converts smartphone browsers into loyal customers.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
      author: "Sarah Wilson",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 5, 2024",
      category: "ecommerce",
      readTime: "9 min read",
      featured: false,
    },
    {
      title: "AI Tools for Small Business Owners",
      description:
        "Explore affordable AI solutions that can help small business owners automate tasks and improve efficiency.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
      author: "David Lee",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Nov 30, 2024",
      category: "technology",
      readTime: "5 min read",
      featured: false,
    },
  ];

  // Filter blogs based on active category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "all" || blog.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Get featured blog
  const featuredBlog = blogs.find((blog) => blog.featured);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <BookOpen className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Our Blog
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Insights & Inspiration
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with our latest insights and articles on business,
            technology, and trends to help you grow and succeed.
          </p>
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={featuredBlog.imageUrl || "/placeholder.svg"}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured Post
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium text-primary capitalize">
                      {featuredBlog.category}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {featuredBlog.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredBlog.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <img
                        src={featuredBlog.authorImage || "/placeholder.svg"}
                        alt={featuredBlog.author}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {featuredBlog.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          {featuredBlog.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="group">
                      <Link
                        to={featuredBlog.link}
                        className="flex items-center"
                      >
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-white border border-gray-200 p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border-gray-200"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div key={index} variants={item}>
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.imageUrl}
                  link={blog.link}
                  author={blog.author}
                  authorImage={blog.authorImage}
                  date={blog.date}
                  category={blog.category}
                  readTime={blog.readTime}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

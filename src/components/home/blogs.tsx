import BlogCard from "./blog-card";

export default function Blogs() {
  const blogs = [
    {
      title: "10 Tips for Starting an Online Business",
      description:
        "Starting an online business can be daunting. Learn 10 essential tips to help you get started the right way.",
      imageUrl:
        "  https://i.ibb.co.com/gdm4zSQ/online-business-management-train.png",
      link: "#",
      author: "John Doe",
      date: "Dec 25, 2024",
    },
    {
      title: "How to Improve Your Website's SEO",
      description:
        "Discover actionable strategies to boost your website's search engine rankings and attract more visitors.",
      imageUrl: "  https://i.ibb.co.com/M8cfnrZ/image-14.jpg",
      link: "#",
      author: "Jane Smith",
      date: "Dec 20, 2024",
    },
    {
      title: "The Future of E-Commerce in 2025",
      description:
        "Explore the latest trends and technologies shaping the future of online shopping and digital commerce.",
      imageUrl: "  https://i.ibb.co.com/j88qg32/image-15.jpg",
      link: "#",
      author: "Emily Johnson",
      date: "Dec 15, 2024",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Latest Blogs
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Stay updated with our latest insights and articles on business,
          technology, and trends.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
              link={blog.link}
              author={blog.author}
              date={blog.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

interface BlogDetailsProps {
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  author: string;
  authorImage: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogDetailsProps | null>(null);

  useEffect(() => {
    // You can fetch blog details by ID from your API or a mock data array
    const blogData = blogs.find((blog) => blog.id === blogId);
    if (blogData) {
      setBlog(blogData);
    }
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>; // Add a loading state until blog is found
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Blog Detail */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <BookOpen className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Our Blog
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h2>
          <p className="text-lg text-gray-600">{blog.description}</p>
        </div>

        {/* Blog Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-96 lg:h-full">
            <img
              src={blog.imageUrl || "/placeholder.svg"}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-primary capitalize">
                {blog.category}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-500">{blog.readTime}</span>
            </div>

            <div className="text-gray-600 mb-8">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                <img
                  src={blog.authorImage || "/placeholder.svg"}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              </div>

              <Button variant="outline" asChild className="group">
                <Link to="/blogs" className="flex items-center">
                  Back to All Articles
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const blogs = [
  {
    id: "1",
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
    content: `
        Starting an online business is an exciting venture that offers unlimited potential. However, it can also be challenging, especially if you're new to the world of entrepreneurship. Here are 10 tips to help you get started the right way:
        1. **Choose the Right Niche**: Focus on a niche that you are passionate about and has potential for growth.
        2. **Develop a Business Plan**: Outline your goals, strategies, and budget.
        3. **Invest in a Professional Website**: Your website is your storefront; make sure it’s visually appealing and user-friendly.
        4. **Understand SEO**: Search engine optimization is crucial for organic traffic.
        5. **Utilize Social Media**: Create profiles on relevant platforms to reach potential customers.
        6. **Offer Exceptional Customer Service**: Your customers should feel valued and heard.
        7. **Optimize for Mobile**: Ensure that your website is mobile-responsive.
        8. **Track Analytics**: Use tools to measure your business’s performance.
        9. **Focus on Branding**: Build a brand identity that resonates with your audience.
        10. **Keep Learning**: Stay updated on trends and technologies in your industry.
      `,
  },
  {
    id: "2",

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
    content: `
        Search engine optimization (SEO) is a critical part of any digital marketing strategy. Improving your website's SEO can lead to increased visibility and higher rankings in search engine results. Here are some strategies to help:
        1. **Perform Keyword Research**: Identify the most relevant keywords for your business and incorporate them into your content.
        2. **Optimize Page Titles and Meta Descriptions**: Make sure each page has a unique and descriptive title and meta description.
        3. **Create Quality Content**: Regularly publish high-quality, informative content that answers the needs of your target audience.
        4. **Improve Site Speed**: A slow-loading website can negatively affect your SEO rankings and user experience.
        5. **Build Backlinks**: Earn backlinks from reputable websites in your industry.
        6. **Use Internal Linking**: Interlink your pages to help search engines understand the structure of your website.
        7. **Mobile Optimization**: Ensure your website is mobile-friendly to improve both SEO and user experience.
      `,
  },
  {
    id: "3",

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
    content: `
        The e-commerce industry is rapidly evolving, and 2025 promises to bring significant changes. Here’s a look at some of the trends that will shape the future of online shopping:
        1. **AI and Personalization**: AI tools will allow e-commerce businesses to personalize customer experiences and optimize product recommendations.
        2. **Voice Commerce**: As voice assistants become more common, voice-based shopping will increase.
        3. **Augmented Reality (AR)**: AR will enable customers to try before they buy, improving decision-making.
        4. **Subscription Services**: The popularity of subscription models for everything from products to services will continue to grow.
        5. **Sustainable Shopping**: Consumers are increasingly seeking sustainable and eco-friendly products.
        6. **Omnichannel Shopping**: Customers will expect a seamless experience across both online and offline channels.
      `,
  },
  {
    id: "4",

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
    content: `
        Customer trust is essential for the success of any online business. Without trust, customers may hesitate to make purchases. Here are some proven strategies for building and maintaining trust in digital marketplaces:
        1. **Display Trust Badges and Certifications**: Show that your website is secure with SSL certificates and payment security badges.
        2. **Offer Clear Return and Refund Policies**: A transparent return policy reassures customers that they are not taking risks when purchasing.
        3. **Provide Social Proof**: Display customer reviews, testimonials, and ratings to demonstrate that others have had positive experiences with your store.
        4. **Use High-Quality Product Images**: Clear, high-quality product images give customers a better understanding of what they are buying.
        5. **Respond to Customer Inquiries Quickly**: Excellent customer service can make a significant difference in building trust.
      `,
  },
  {
    id: "5",

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
    content: `
        Mobile commerce (m-commerce) is on the rise, with more consumers shopping on their smartphones. To capture this growing audience, it’s essential to optimize your online store for mobile devices. Here are some tips:
        1. **Ensure Mobile-Friendly Design**: Your website should be fully responsive and easy to navigate on smaller screens.
        2. **Optimize Checkout for Mobile**: Simplify the checkout process and offer mobile-friendly payment options such as Apple Pay or Google Pay.
        3. **Fast Loading Speed**: Mobile users expect fast loading times; optimize images and reduce unnecessary scripts to improve speed.
        4. **Use Mobile-Specific Features**: Implement features like click-to-call or location-based services to enhance the mobile shopping experience.
      `,
  },
  {
    id: "6",

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
    content: `
        Artificial Intelligence (AI) is no longer just for large corporations. Small business owners can also benefit from affordable AI tools that streamline operations and enhance productivity. Here are some ways AI can help:
        1. **Customer Service Automation**: Use AI-powered chatbots to provide 24/7 support and handle common customer queries.
        2. **Inventory Management**: AI can predict demand and automate stock replenishment.
        3. **Marketing Automation**: AI tools can help create targeted ad campaigns, email marketing, and social media strategies.
        4. **Financial Management**: Use AI software to automate bookkeeping and track business expenses more efficiently.
        5. **Data Analysis**: AI tools can help small business owners analyze data to make informed decisions about pricing, inventory, and customer behavior.
      `,
  },
];

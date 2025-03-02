interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  author: string;
  date: string;
}

export default function BlogCard({
  title,
  description,
  imageUrl,
  link,
  author,
  date,
}: BlogCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <a
          href={link}
          className="mt-4 inline-block text-primary hover:underline text-sm font-medium"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}

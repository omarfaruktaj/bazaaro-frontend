export default function AdminProducts() {
  return <div>products</div>;
}

export const ProductDetails = () => {
  // Sample product data
  const product = {
    name: "Product Name",
    price: "$99.99",
    category: "Electronics",
    description:
      "This is a detailed description of the product. It includes all the important information a customer might need to know about the product, such as features, materials, size, and other specifications.",
    images: [
      "https://via.placeholder.com/400x300",
      "https://via.placeholder.com/400x300",
      "https://via.placeholder.com/400x300",
    ],
    shopName: "CoolShop",
    shopUrl: "/shop",
    relatedProducts: [
      {
        id: 1,
        name: "Related Product 1",
        price: "$89.99",
        image: "https://via.placeholder.com/200x200",
      },
      {
        id: 2,
        name: "Related Product 2",
        price: "$109.99",
        image: "https://via.placeholder.com/200x200",
      },
      {
        id: 3,
        name: "Related Product 3",
        price: "$79.99",
        image: "https://via.placeholder.com/200x200",
      },
    ],
    reviews: [
      { user: "John", rating: 4, comment: "Great product!" },
      { user: "Jane", rating: 5, comment: "Exceeded my expectations." },
      { user: "Alex", rating: 3, comment: "Good, but has some issues." },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product details */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="flex-1">
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">{product.price}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>

          {/* Shop Name with clickable link */}
          <p className="text-sm text-blue-500">
            Shop by{" "}
            <a href={product.shopUrl} className="underline hover:text-blue-700">
              {product.shopName}
            </a>
          </p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {product.relatedProducts.map((related) => (
            <div key={related.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{related.name}</h3>
              <p className="text-gray-700">{related.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{review.user}</span>
                <span className="ml-2 text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

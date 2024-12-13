import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  return (
    <Card>
      <CardHeader className="p-0 pb-4 ">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-t-md"
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent
        className="px-4 pb-4
      "
      >
        <CardTitle className="truncate">{product.name} </CardTitle>
        <CardDescription> {product.category.name} </CardDescription>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold ">
              ${discountedPrice || product.price.toFixed(2)}
            </span>
            {discountedPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">{product.quantity} in stock</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground ">
          <span className="inline-block">Shop: {product.shop.name}</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

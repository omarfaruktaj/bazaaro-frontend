import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Ratings } from "@/components/ui/rating";
import { selectUser } from "@/features/auth/auth-slice";
import {
  useAddProductToCartMutation,
  useGetCartQuery,
} from "@/features/cart/cart-api";
import { Cart, Product, Review } from "@/types";
import { Response } from "@/types/response";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery(null, {
    skip: !user,
  });

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  const averageRating = calculateAverageRating(product.review);

  if (isCartLoading) {
    return <Loading />;
  }

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");

    if (
      cart?.shopId &&
      cart.shopId !== product.shopId &&
      cart.cartItems.length
    ) {
      setIsModalOpen(true);
      return;
    }

    const res = (await addProductToCart({
      productId: product.id,
    })) as Response<Cart>;

    if (res.error) {
      toast.error(
        res.error?.data.message ||
          "Failed to add product into cart. Please try again."
      );
    } else {
      toast.success("Product successfully added into cart");
    }
  };

  const handleReplaceCart = async () => {
    const res = (await addProductToCart({
      productId: product.id,
    })) as Response<Cart>;

    if (res.error) {
      toast.error(
        res.error?.data.message ||
          "Failed to add product into cart. Please try again."
      );
    } else {
      toast.success("Product successfully added into cart");
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="border-0 shadow-md hover:shadow-xl group flex flex-col h-full">
        <CardHeader className="p-0">
          <div
            className="relative cursor-pointer rounded-t-md overflow-hidden"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              className="w-full object-cover mx-auto h-36 lg:h-48 rounded-t-md group-hover:scale-105  duration-300 transition-transform transform "
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
            />
            {product.discount && product.discount > 0 ? (
              <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                {product.discount}% OFF
              </span>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col flex-grow space-y-4">
          <CardTitle
            className="text-lg font-semibold text-gray-800 line-clamp-2 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.name}
          </CardTitle>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Ratings
              rating={Number(averageRating)}
              size={18}
              disabled
              variant="default"
            />
            <p className="font-medium">{averageRating}</p>
            <p className="text-gray-500">({product.review?.length || 0})</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${discountedPrice || product.price.toFixed(2)}
              </span>
              {discountedPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            className="w-full group bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white mt-2"
            disabled={isLoading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <DialogModal
        className="max-w-xl"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="You're adding products from a different vendor"
      >
        <DialogDescription>
          It looks like you already have products from another vendor in your
          cart. Would you like to replace the existing products with the new
          one(s) or keep your current cart?
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="destructive" onClick={handleReplaceCart}>
            Replace with new product(s)
          </Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Keep current cart and cancel
          </Button>
        </div>
      </DialogModal>
    </>
  );
}

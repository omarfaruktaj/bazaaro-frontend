import DialogModal from "@/components/Dialog-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import {
  useAddProductToCartMutation,
  useGetCartQuery,
} from "@/features/cart/cart-api";
import { Cart, Product } from "@/types";
import { Response } from "@/types/response";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery(null);

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  if (isCartLoading) {
    return <Loading />;
  }

  const handleAddToCart = async () => {
    if (cart?.shopId && cart.shopId !== product.shopId) {
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
      <Card>
        <CardHeader className="p-0 pb-4 ">
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-t-md"
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
            />
            {product &&
              product.discount !== undefined &&
              product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                  {product.discount}% OFF
                </span>
              )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <CardTitle
            onClick={() => navigate(`/products/${product.id}`)}
            className="truncate cursor-pointer"
          >
            {product.name}
          </CardTitle>
          <CardDescription>{product.category.name}</CardDescription>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold">
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
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="inline-block">Shop: {product.shop.name}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 flex gap-4">
          <Button disabled={isLoading} onClick={handleAddToCart}>
            Add to cart
          </Button>
        </CardFooter>
      </Card>
      <DialogModal
        className="max-w-xl"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"You're adding products from a different vendor"}
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

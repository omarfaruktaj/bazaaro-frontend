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
import { DialogDescription } from "@/components/ui/dialog";
import { addToCompare } from "@/features/product-compare/product-compare-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );
  const navigate = useNavigate();
  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  const handleAddToCompare = () => {
    if (compareList.length === 0) {
      dispatch(addToCompare(product));
      setIsModalOpen(true);
    }
    const firstProductCategoryId = compareList[0].category.id;

    if (product.categoryId !== firstProductCategoryId) {
      return toast.error(
        "You can only compare products from the same category."
      );
    }

    if (
      compareList.length < 3 &&
      !compareList.some((p) => p.id === product.id)
    ) {
      dispatch(addToCompare(product));
      setIsModalOpen(true);
    }
  };
  const handleGoToCompare = () => {
    setIsModalOpen(false);
    navigate("/compare-products");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const isInCompareList = compareList.some((p) => p.id === product.id);

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
            {product.discount && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <CardTitle className="truncate">{product.name}</CardTitle>
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
          <Button>Add to cart</Button>

          <Button
            variant={isInCompareList ? "outline" : "secondary"}
            onClick={handleAddToCompare}
            disabled={isInCompareList || compareList.length >= 3}
            className=""
          >
            {isInCompareList ? "Added to Compare" : "Add to Compare"}
          </Button>
        </CardFooter>
      </Card>
      <DialogModal
        className="max-w-xl"
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={"Product Added to Compare"}
      >
        <DialogDescription>
          You have successfully added this{" "}
          <span>
            <Link
              to={`/products/${product.id}`}
              className="underline text-primary"
            >
              {product.name}
            </Link>
          </span>{" "}
          to the compare list. Do you want to go to the compare page?
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleGoToCompare}>Go to Compare Page</Button>
        </div>
      </DialogModal>
    </>
  );
}

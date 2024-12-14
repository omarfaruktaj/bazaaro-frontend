import DialogModal from "@/components/Dialog-modal";
import EmblaCarousel from "@/components/embal-carousel/embla-carousel";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { addToCompare } from "@/features/product-compare/product-compare-slice";
import { useGetSingleProductQuery } from "@/features/product/product-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function ProductDetails() {
  const { productId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );

  const navigate = useNavigate();

  const { data: product, isLoading } = useGetSingleProductQuery(productId!);

  const [quantity, setQuantity] = useState<number>(1);

  if (isLoading) return <Loading />;

  if (!product)
    return (
      <div>
        <h2>No product Found</h2>
      </div>
    );

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
    <div className="py-12">
      <div className="flex items-start justify-between">
        <BackButton />
      </div>
      <div className=" px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-xl overflow-hidden ">
              <EmblaCarousel slides={product.images} options={{ loop: true }} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {product.discount && (
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide">
                {product.discount}% Off
              </span>
            )}

            <p className="text-lg text-gray-600 font-medium">
              {product.category.name}
            </p>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold ">
                ${discountedPrice || product.price.toFixed(2)}
              </div>

              {discountedPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="text-sm text-gray-500">
              <span className="font-medium">Shop: {product.shop.name}</span>
              <span className="ml-6">
                {product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of Stock"}
              </span>
            </div>

            {product.quantity > 0 && (
              <div className="flex items-center mt-4 space-x-4">
                <Button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  size={"icon"}
                  variant={"outline"}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="text-lg font-semibold">{quantity}</span>
                <Button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.quantity}
                  aria-label="Increase quantity"
                  size={"icon"}
                  variant={"outline"}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                size={"lg"}
                disabled={product.quantity <= 0 || quantity <= 0}
              >
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant={isInCompareList ? "outline" : "secondary"}
                onClick={handleAddToCompare}
                disabled={isInCompareList || compareList.length >= 3}
                className=""
              >
                {isInCompareList ? "Added to Compare" : "Add to Compare"}
              </Button>
            </div>
          </div>
        </div>
        {/* here */}
      </div>
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
    </div>
  );
}

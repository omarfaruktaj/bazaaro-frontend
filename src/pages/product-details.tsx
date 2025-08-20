import DialogModal from "@/components/Dialog-modal";
import EmblaCarousel from "@/components/embal-carousel/embla-carousel";
import { ProductDetailsSkeleton } from "@/components/skeletons/product-details-skeleton";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Ratings } from "@/components/ui/rating";
import {
  addToCart,
  getCart,
  replaceCart,
  selectCart,
} from "@/features/cart/cart-slice";
import { addToCompare } from "@/features/product-compare/product-compare-slice";
import ProductCard from "@/features/product/components/product-card";
import ProductReview from "@/features/product/components/product-review";
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from "@/features/product/product-api";
import { addRecentVisitedProduct } from "@/features/product/product-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { calculateAverageRating } from "@/utils/calculate-review";
import { trackViewItemFromProduct } from "@/utils/gtm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function ProductDetails() {
  const { productId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useSelector(selectCart);

  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );

  const navigate = useNavigate();

  const { data: product, isLoading } = useGetSingleProductQuery(productId!);
  const { data: relatedProducts, isLoading: isProductsLoading } =
    useGetProductsQuery(
      {
        category: product?.categoryId,
        include: "category,shop",
        notProductId: product?.id,
        limit: 4,
      },
      { skip: !product }
    );

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      dispatch(addRecentVisitedProduct(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      trackViewItemFromProduct(product);
    }
  }, [product]);

  if (isLoading || isProductsLoading) return <ProductDetailsSkeleton />;

  if (!product)
    return (
      <div className="container text-center py-24">
        <h2 className="text-2xl font-bold">No Product Found</h2>
      </div>
    );

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  const incrementQuantity = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCompare = () => {
    if (compareList.length === 0) {
      dispatch(addToCompare(product));
      setIsModalOpen(true);
    }
    const firstProductCategoryId = compareList[0]?.category.id;
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

  const handleCancel = () => setIsModalOpen(false);

  const isInCompareList = compareList.some((p) => p.id === product.id);

  const handleAddToCart = async () => {
    if (cart?.shopId && cart.shopId !== product.shopId) {
      setIsWarningModalOpen(true);
      return;
    }

    try {
      dispatch(addToCart({ product, quantity }));
      toast.success("Product successfully added into cart");
    } catch (err) {
      if ((err as Error).message === "Different vendor") {
        setIsModalOpen(true);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    }
  };

  const handleReplaceCart = async () => {
    // const res = (await addProductToCart({
    //   productId: product.id,
    // })) as Response<Cart>;
    // if (res.error) {
    //   toast.error(
    //     res.error?.data.message ||
    //       "Failed to replace cart items. Please try again."
    //   );
    // } else {
    //   toast.success("Cart replaced with new items");
    // }
    dispatch(replaceCart(product));

    setIsWarningModalOpen(false);
  };

  const averageRating = calculateAverageRating(product.review);
  const products = relatedProducts?.products;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex justify-center md:justify-start w-full">
          <div className="w-full  max-w-xl overflow-hidden ">
            <EmblaCarousel slides={product.images} options={{ loop: true }} />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                {product.discount && product.discount > 0 && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                )}
                <Link
                  to={`/products?category=${product.categoryId}`}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  {product.category.name}
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Ratings
                rating={Number(averageRating)}
                size={20}
                disabled
                variant="default"
              />
              <span className="text-sm text-muted-foreground">
                ({product.review?.length || 0} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${discountedPrice || product.price.toFixed(2)}
              </span>
              {discountedPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div>
                Sold by{" "}
                <Link
                  to={`/shops/${product.shopId}`}
                  className="font-medium text-indigo-600 hover:text-indigo-800"
                >
                  {product.shop.name}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.quantity > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {product.quantity > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.quantity > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        if (value > 0 && value <= product.quantity) {
                          setQuantity(value);
                        } else if (value > product.quantity) {
                          setQuantity(product.quantity);
                          toast.error(
                            `Only ${product.quantity} items available`
                          );
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.quantity}
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  // className=" sm:w-auto flex-1"
                >
                  {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToCompare}
                  disabled={isInCompareList || compareList.length >= 3}
                  className="w-full sm:w-auto"
                >
                  {isInCompareList ? "In Compare List" : "Compare"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        {products && products.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No related products found</p>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {product.review.length > 0 ? (
          <div className="space-y-8">
            {product.review.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-white rounded-lg border shadow-sm"
              >
                <ProductReview review={review} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}
      </section>

      {/* Compare Modal */}
      <DialogModal
        className="max-w-xl"
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Product Added to Compare"
      >
        <DialogDescription>
          You've added{" "}
          <Link
            to={`/products/${product.id}`}
            className="underline text-primary font-medium"
          >
            {product.name}
          </Link>{" "}
          to your comparison list. Would you like to view the comparison page?
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Continue Shopping
          </Button>
          <Button onClick={handleGoToCompare}>View Comparison</Button>
        </div>
      </DialogModal>

      {/* Cart Warning Modal */}
      <DialogModal
        className="max-w-xl"
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        title="Different Vendor Detected"
      >
        <DialogDescription>
          Your cart contains items from another vendor. Replacing them will
          remove the current items. How would you like to proceed?
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="destructive" onClick={handleReplaceCart}>
            Replace Items
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsWarningModalOpen(false)}
          >
            Keep Current Cart
          </Button>
        </div>
      </DialogModal>
    </div>
  );
}

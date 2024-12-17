import DialogModal from "@/components/Dialog-modal";
import EmblaCarousel from "@/components/embal-carousel/embla-carousel";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/components/ui/loading";
import { selectUser } from "@/features/auth/auth-slice";
import {
  useAddProductToCartMutation,
  useGetCartQuery,
} from "@/features/cart/cart-api";
import { addToCompare } from "@/features/product-compare/product-compare-slice";
import ProductCard from "@/features/product/components/product-card";
import ProductReview from "@/features/product/components/product-review";
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from "@/features/product/product-api";
import { addRecentVisitedProduct } from "@/features/product/product-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Cart } from "@/types";
import { Response } from "@/types/response";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function ProductDetails() {
  const user = useSelector(selectUser);

  const { productId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery(null, {
    skip: !user,
  });

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
      {
        skip: !product,
      }
    );
  const [addProductToCart, { isLoading: isAddingProductToCart }] =
    useAddProductToCartMutation();

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      dispatch(addRecentVisitedProduct(product));
    }
  }, [product, dispatch]);

  if (isLoading || isCartLoading || isProductsLoading) return <Loading />;

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
    const firstProductCategoryId = compareList[0]?.category.id;
    if (
      firstProductCategoryId &&
      product.categoryId !== firstProductCategoryId
    ) {
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

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");

    if (cart?.shopId && cart.shopId !== product.shopId) {
      setIsWarningModalOpen(true);
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
    setIsWarningModalOpen(false);
  };

  const products = relatedProducts?.products;

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-start justify-between">
        <BackButton />
      </div>
      <div className=" px-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center md:justify-start w-full">
            <div className="w-full max-w-xl overflow-hidden ">
              <EmblaCarousel slides={product.images} options={{ loop: true }} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {product.discount && product.discount > 0 ? (
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide">
                {product.discount}% Off
              </span>
            ) : null}

            <p className="text-lg text-muted-foreground font-medium">
              <Link to={`/products?category=${product.categoryId}`}>
                {product.category.name}
              </Link>
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

            <div className="text-sm text-muted-foreground flex">
              <p className="font-medium">
                Shop:{" "}
                <Link
                  to={`/shops/${product.shopId}`}
                  className="text-base text-gray-900 hover:underline"
                >
                  {product.shop.name}
                </Link>{" "}
              </p>
              <p className="ml-6">
                {product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of Stock"}
              </p>
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
                onClick={handleAddToCart}
                disabled={
                  product.quantity <= 0 ||
                  quantity <= 0 ||
                  isAddingProductToCart
                }
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

        <div className="mt-12">
          <h2 className="text-2xl font-semibold  mb-4">Related Products</h2>
          {products && products.length > 0 ? (
            <div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full "
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <p className="text-muted-foreground">No Related product found</p>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 ">Customer Reviews</h2>

          {product.review.length > 0 ? (
            <div className="space-y-8">
              {product.review.map((review) => (
                <ProductReview review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
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
      {/* Cart warning  */}
      <DialogModal
        className="max-w-xl"
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
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
          <Button
            variant="secondary"
            onClick={() => setIsWarningModalOpen(false)}
          >
            Keep current cart and cancel
          </Button>
        </div>
      </DialogModal>
    </div>
  );
}

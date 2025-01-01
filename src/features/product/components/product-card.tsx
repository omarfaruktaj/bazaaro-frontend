// import DialogModal from "@/components/Dialog-modal";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Loading from "@/components/ui/loading";
// import { selectUser } from "@/features/auth/auth-slice";
// import {
//   useAddProductToCartMutation,
//   useGetCartQuery,
// } from "@/features/cart/cart-api";
// import { Cart, Product } from "@/types";
// import { Response } from "@/types/response";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { toast } from "sonner";

// export default function ProductCard({ product }: { product: Product }) {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const user = useSelector(selectUser);
//   const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
//   const { data: cart, isLoading: isCartLoading } = useGetCartQuery(null, {
//     skip: !user,
//   });

//   const discountedPrice = product.discount
//     ? (product.price - (product.price * product.discount) / 100).toFixed(2)
//     : null;

//   if (isCartLoading) {
//     return <Loading />;
//   }

//   const handleAddToCart = async () => {
//     if (!user) return navigate("/login");

//     if (
//       cart?.shopId &&
//       cart.shopId !== product.shopId &&
//       cart.cartItems.length
//     ) {
//       setIsModalOpen(true);
//       return;
//     }

//     const res = (await addProductToCart({
//       productId: product.id,
//     })) as Response<Cart>;

//     if (res.error) {
//       toast.error(
//         res.error?.data.message ||
//           "Failed to add product into cart. Please try again."
//       );
//     } else {
//       toast.success("Product successfully added into cart");
//     }
//   };
//   const handleReplaceCart = async () => {
//     const res = (await addProductToCart({
//       productId: product.id,
//     })) as Response<Cart>;

//     if (res.error) {
//       toast.error(
//         res.error?.data.message ||
//           "Failed to add product into cart. Please try again."
//       );
//     } else {
//       toast.success("Product successfully added into cart");
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Card className=" border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="p-0">
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate(`/products/${product.id}`)}
//           >
//             <img
//               className="w-full h-44 object-cover rounded-t-md p-1"
//               src={product.images[0] || "/images/placeholder.jpg"}
//               alt={product.name}
//             />
//             {product.discount && product.discount > 0 ? (
//               <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
//                 {product.discount}% OFF
//               </span>
//             ) : null}
//           </div>
//         </CardHeader>

//         <CardContent className="p-4 space-y-3">
//           <CardTitle
//             className="text-lg font-semibold truncate cursor-pointer hover:text-gray-700 transition-colors"
//             onClick={() => navigate(`/products/${product.id}`)}
//           >
//             {product.name}
//           </CardTitle>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className="text-xl font-bold text-gray-900">
//                 ${discountedPrice || product.price.toFixed(2)}
//               </span>
//               {discountedPrice && (
//                 <span className="text-sm text-gray-400 line-through">
//                   ${product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="p-4">
//           <Button
//             className="w-full"
//             disabled={isLoading}
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//         </CardFooter>
//       </Card>

//       <DialogModal
//         className="max-w-xl"
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={"You're adding products from a different vendor"}
//       >
//         <DialogDescription>
//           It looks like you already have products from another vendor in your
//           cart. Would you like to replace the existing products with the new
//           one(s) or keep your current cart?
//         </DialogDescription>
//         <div className="mt-4 flex justify-end gap-4">
//           <Button variant="destructive" onClick={handleReplaceCart}>
//             Replace with new product(s)
//           </Button>
//           <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
//             Keep current cart and cancel
//           </Button>
//         </div>
//       </DialogModal>
//     </>
//   );
// }

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
      <Card className=" border-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              className="w-full h-44 object-cover rounded-t-md p-1"
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

        <CardContent className="p-4 space-y-3">
          <CardTitle
            className="text-lg font-semibold truncate cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.name}
          </CardTitle>

          <div className="flex items-center gap-1">
            <Ratings
              rating={Number(averageRating)}
              size={18}
              disabled
              variant="default"
            />
            <p className="text-base text-muted-foreground font-semibold">
              {`${averageRating}`}
            </p>
            <p className="text-base text-muted-foreground font-semibold">
              ({`${product?.review?.length || 0}`})
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">
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

        <CardFooter className="p-4">
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={handleAddToCart}
          >
            Add to Cart
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

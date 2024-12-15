import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemQuantityMutation,
} from "@/features/cart/cart-api";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart, isLoading, error } = useGetCartQuery(null);
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        There was an error loading your cart. Please try again later.
      </div>
    );
  }

  const handleIncreaseQuantity = async (
    productId: string,
    cardItemId: string,
    currentQuantity: number,
    stock: number
  ) => {
    if (currentQuantity < stock) {
      await updateCartItemQuantity({
        data: { cartItemsId: productId, quantity: currentQuantity + 1 },
        cartId: cardItemId,
      }).unwrap();
    } else {
      toast.error("You cannot add more than available stock.");
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    cardItemId: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      await updateCartItemQuantity({
        data: { cartItemsId: productId, quantity: currentQuantity - 1 },
        cartId: cardItemId,
      }).unwrap();
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    await deleteCartItem(productId).unwrap();
  };

  // const calculateTotalPrice = () => {
  //   return (
  //     cart?.cartItems
  //       .reduce((total, item) => {
  //         const discountedPrice = item.product.discount
  //           ? item.product.price -
  //             (item.product.price * item.product.discount) / 100
  //           : item.product.price;
  //         return total + discountedPrice * item.quantity;
  //       }, 0)
  //       ?.toFixed(2) || "0.00"
  //   );
  // };

  const handleCheckout = () => {
    if (cart?.cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add some items before proceeding."
      );
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="px-4 py-12">
      <BackButton />
      {cart?.cartItems.length !== 0 && (
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Your Cart</h1>
      )}

      {cart?.cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Your cart is currently empty.
          </p>
          <Button onClick={() => navigate("/products")} className="">
            Browse Products
          </Button>
        </div>
      ) : (
        <div>
          <div className="space-y-8">
            {cart?.cartItems.map((item) => {
              const discountedPrice = item.product.discount
                ? item.product.price -
                  (item.product.price * item.product.discount) / 100
                : item.product.price;

              return (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6 relative"
                >
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="absolute top-2 right-2 transition"
                  >
                    <TrashIcon className="w-5 h-5 " />
                  </Button>

                  <div className="w-full md:w-1/4 p-4">
                    <img
                      className="w-full h-48 object-cover rounded-lg"
                      src={item.product.images[0] || "/images/placeholder.jpg"}
                      alt={item.product.name}
                    />
                  </div>

                  <div className="flex flex-col justify-between p-4 w-full md:w-3/4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        <Link
                          to={`/products/${item.product.id}`}
                          className="hover:underline"
                        >
                          {item.product.name}
                        </Link>
                      </h2>

                      <div className="flex items-center space-x-4 mt-2">
                        <div className="text-2xl font-bold ">
                          ${discountedPrice || item.product.price.toFixed(2)}
                        </div>

                        {discountedPrice && (
                          <div className="text-lg text-muted-foreground line-through">
                            ${item.product.price.toFixed(2)}
                          </div>
                        )}
                      </div>

                      {item.product.discount ? (
                        <p className="text-sm text-red-500 mt-1">
                          {item.product.discount}% OFF
                        </p>
                      ) : null}

                      <div className="flex items-center mt-4 space-x-4">
                        <Button
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.product.id,
                              item.id,
                              item.quantity
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          size={"icon"}
                          variant={"outline"}
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.product.id,
                              item.id,
                              item.quantity,
                              item.product.quantity
                            )
                          }
                          disabled={item.quantity >= item.product.quantity}
                          aria-label="Increase quantity"
                          size={"icon"}
                          variant={"outline"}
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-white shadow-md p-6 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                Total: ${cart?.totalPrice.toFixed(2) || "0.00"}
              </p>
            </div>
            <div>
              <Button onClick={handleCheckout} className=" transition">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

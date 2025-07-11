"use client";

import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemQuantityMutation,
} from "@/features/cart/cart-api";
import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart, isLoading, error } = useGetCartQuery(null);
  const [updateCartItemQuantity, { isLoading: isUpdating }] =
    useUpdateCartItemQuantityMutation();
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
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

  const handleCheckout = () => {
    if (cart?.cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add some items before proceeding."
      );
    } else {
      navigate("/checkout");
    }
  };
  const calculateSubtotal = () => {
    return (
      cart?.cartItems.reduce((total, item) => {
        const discountedPrice = item.product.discount
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price;
        return total + discountedPrice * item.quantity;
      }, 0) || 0
    );
  };

  const totalSavings = () => {
    return (
      cart?.cartItems.reduce((total, item) => {
        if (item.product.discount) {
          const savings =
            ((item.product.price * item.product.discount) / 100) *
            item.quantity;
          return total + savings;
        }
        return total;
      }, 0) || 0
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <BackButton />
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 ml-4">
            Shopping Cart
          </h1>
        </div>

        {cart?.cartItems.length === 0 || error ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8 text-center max-w-md">
                Looks like you haven't added any products to your cart yet.
                Browse our collection and find something you'll love!
              </p>
              <Button
                onClick={() => navigate("/products")}
                className="px-8"
                size="lg"
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-white px-6 py-4 border-b">
                  <div className="flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">
                      Cart Items ({cart?.cartItems.length})
                    </h2>
                  </div>
                </div>

                <CardContent className="p-0">
                  {cart?.cartItems.map((item, index) => {
                    const discountedPrice = item.product.discount
                      ? item.product.price -
                        (item.product.price * item.product.discount) / 100
                      : item.product.price;

                    return (
                      <div key={item.id} className="relative">
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 max-w-[180px] mx-auto md:mx-0">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img
                                className="w-full h-full object-cover"
                                src={
                                  item.product.images[0] ||
                                  "/images/placeholder.jpg"
                                }
                                alt={item.product.name}
                              />
                            </div>
                          </div>

                          <div className="flex-grow flex flex-col">
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                  <Link to={`/products/${item.product.id}`}>
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                  disabled={isDeleting}
                                  className="text-gray-500 hover:text-red-500 -mt-1 -mr-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              {item.product.discount !== undefined &&
                                item.product.discount > 0 && (
                                  <div className="flex items-center mt-1">
                                    <Tag className="h-3 w-3 text-green-600 mr-1" />
                                    <span className="text-sm font-medium text-green-600">
                                      {item.product.discount}% OFF
                                    </span>
                                  </div>
                                )}

                              <div className="mt-2 text-sm text-gray-500">
                                {item.product.quantity > 5 ? (
                                  <span className="text-green-600">
                                    In Stock
                                  </span>
                                ) : item.product.quantity > 0 ? (
                                  <span className="text-amber-600">
                                    Only {item.product.quantity} left
                                  </span>
                                ) : (
                                  <span className="text-red-600">
                                    Out of Stock
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                                <Button
                                  onClick={() =>
                                    handleDecreaseQuantity(
                                      item.product.id,
                                      item.id,
                                      item.quantity
                                    )
                                  }
                                  disabled={item.quantity <= 1 || isUpdating}
                                  aria-label="Decrease quantity"
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">
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
                                  disabled={
                                    item.quantity >= item.product.quantity ||
                                    isUpdating
                                  }
                                  aria-label="Increase quantity"
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  $
                                  {(discountedPrice * item.quantity).toFixed(2)}
                                </div>
                                {item.product.discount !== undefined &&
                                  item.product.discount > 0 && (
                                    <div className="text-sm text-gray-500 line-through">
                                      $
                                      {(
                                        item.product.price * item.quantity
                                      ).toFixed(2)}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cart.cartItems.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>

                <div className="text-sm text-gray-500">
                  {cart?.cartItems.length}{" "}
                  {cart?.cartItems.length === 1 ? "item" : "items"} in your cart
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-4">
                <div className="bg-white px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${calculateSubtotal().toFixed(2)}
                      </span>
                    </div>

                    {totalSavings() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Savings
                        </span>
                        <span>-${totalSavings().toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${cart?.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {totalSavings() > 0 && (
                      <div className="bg-green-50 border border-green-100 rounded-md p-3 text-sm text-green-800 flex items-start">
                        <Tag className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          You're saving{" "}
                          <strong>${totalSavings().toFixed(2)}</strong> on your
                          order today!
                        </span>
                      </div>
                    )}

                    <Button
                      onClick={handleCheckout}
                      className="w-full mt-4"
                      size="lg"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center text-sm text-gray-500 mt-4">
                      <p>We accept</p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <img
                          src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/visa.svg"
                          className="h-6"
                          alt="Visa"
                        />
                        <img
                          src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/mastercard.svg"
                          className="h-6"
                          alt="Mastercard"
                        />
                        <img
                          src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/amex.svg"
                          className="h-6"
                          alt="American Express"
                        />
                        <img
                          src="https://cdn.jsdelivr.net/npm/payment-icons@1.1.0/min/flat/paypal.svg"
                          className="h-6"
                          alt="PayPal"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

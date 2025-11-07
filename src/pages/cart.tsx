"use client";

import QuantityInputBasic from "@/components/quantity-input";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeFromCart,
  selectCart,
} from "@/features/cart/cart-slice";
import {
  ArrowRight,
  ChevronLeft,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (cart.cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add some items before proceeding."
      );
    } else {
      navigate("/checkout");
    }
  };

  const calculateTotal = () => {
    return cart.cartItems.reduce((total, item) => {
      const discountedPrice = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + discountedPrice * item.quantity;
    }, 0);
  };
  const calculateSubtotal = () => {
    return cart.cartItems.reduce((total, item) => {
      total += item.price * item.quantity;
      return total;
    }, 0);
  };

  const totalSavings = () => {
    return cart.cartItems.reduce((total, item) => {
      if (item.discount) {
        const savings = ((item.price * item.discount) / 100) * item.quantity;
        return total + savings;
      }
      return total;
    }, 0);
  };

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 mt-10 mb-9">
      <div className="container mx-auto max-w-6xl">
        <BackButton />
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 ml-4">
            Shopping Cart
          </h1>
        </div>

        {cart.cartItems.length === 0 ? (
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
                      Cart Items ({cart.cartItems.length})
                    </h2>
                  </div>
                </div>

                <CardContent className="p-0">
                  {cart.cartItems.map((item, index) => {
                    const discountedPrice = item.discount
                      ? item.price - (item.price * item.discount) / 100
                      : item.price;

                    return (
                      <div key={item.productId} className="relative">
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/4 max-w-[180px] mx-auto md:mx-0">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                              <img
                                className="w-full h-full object-cover"
                                src={item.image || "/images/placeholder.jpg"}
                                alt={item.name}
                              />
                            </div>
                          </div>

                          <div className="flex-grow flex flex-col">
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                  <Link to={`/products/${item.productId}`}>
                                    {item.name}
                                  </Link>
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveFromCart(item.productId)
                                  }
                                  className="text-gray-500 hover:text-red-500 -mt-1 -mr-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              {item.discount ? (
                                <div className="flex items-center mt-1">
                                  <Tag className="h-3 w-3 text-green-600 mr-1" />
                                  <span className="text-sm font-medium text-green-600">
                                    {item.discount}% OFF
                                  </span>
                                </div>
                              ) : null}

                              <div className="mt-2 text-sm text-gray-500">
                                <span className="font-bold">
                                  Price: ${item.price}
                                </span>
                              </div>
                              <div className="mt-2 text-sm text-gray-500">
                                <span className="text-green-600">In Stock</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 pt-4 border-t border-gray-100">
                              {/* <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                                <Button
                                  onClick={() =>
                                    handleDecreaseQuantity(item.productId)
                                  }
                                  disabled={item.quantity <= 1}
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
                                    handleIncreaseQuantity(item.productId)
                                  }
                                  aria-label="Increase quantity"
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div> */}
                              <QuantityInputBasic
                                quantity={item.quantity}
                                min={1}
                                max={item.maxQuantity || 10}
                                onChange={(newQty) => {
                                  if (newQty > item.quantity) {
                                    handleIncreaseQuantity(item.productId);
                                  } else if (newQty < item.quantity) {
                                    handleDecreaseQuantity(item.productId);
                                  }
                                }}
                              />

                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  $
                                  {(discountedPrice * item.quantity).toFixed(2)}
                                </div>
                                {item.discount
                                  ? item.discount > 0 && (
                                      <div className="text-sm text-gray-500 line-through">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                          2
                                        )}
                                      </div>
                                    )
                                  : null}
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
                  {cart.cartItems.length}{" "}
                  {cart.cartItems.length === 1 ? "item" : "items"} in your cart
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
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full mt-4"
                      size="lg"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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

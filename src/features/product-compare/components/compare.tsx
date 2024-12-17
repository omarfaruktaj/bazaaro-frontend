import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCompare, removeFromCompare } from "../product-compare-slice";

export default function Compare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const compareList = useAppSelector(
    (state) => state.productComparison.products
  );

  const handleRemoveFromCompare = (product: Product) => {
    dispatch(removeFromCompare(product.id));
  };

  const handleClearComparison = () => {
    dispatch(clearCompare());
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {compareList.length > 0 ? (
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Product Comparison
        </h1>
      ) : null}

      {compareList.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-muted-foreground">
            <p>No products to compare.</p>
            <Button variant="outline" className="mt-4" onClick={handleGoBack}>
              Browse Products
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {compareList.map((product) => (
            <Card key={product.id} className="shadow-lg border rounded-md ">
              <CardHeader className="p-0 pb-4">
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
                <CardTitle className="text-xl font-semibold">
                  {product.name}
                </CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
                <div className="mt-4">
                  <div className="text-lg font-bold text-gray-800">
                    $
                    {product.discount
                      ? (
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)
                      : product.price.toFixed(2)}
                  </div>
                  {product.discount && product.discount > 0 ? (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {product?.review?.length && (
                    <span className="block">
                      Rating: {product?.review?.length} reviews
                    </span>
                  )}
                  <span className="block">
                    Stock:{" "}
                    {product.quantity > 0
                      ? `${product.quantity} available`
                      : "Out of Stock"}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="px-4 pb-4 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFromCompare(product)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {compareList?.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleClearComparison}
            className="w-full md:w-auto"
          >
            Clear Comparison
          </Button>
          <Button size="lg" className="w-full md:w-auto" onClick={handleGoBack}>
            Back to Products
          </Button>
        </div>
      )}
    </div>
  );
}

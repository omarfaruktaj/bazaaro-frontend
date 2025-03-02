import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import ProductForm from "@/features/product/components/product-form";

export default function CreateProduct() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 ">
      <BackButton />

      <div className="my-8 flex justify-center">
        <Card className="w-full sm:max-w-lg lg:max-w-xl  shadow-lg rounded-xl p-6">
          <CardHeader>
            <Heading
              title="Create New Product"
              description="Add a new product to your inventory"
            />
          </CardHeader>

          <CardContent className="pt-6">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import ProductForm from "@/features/product/components/product-form";

export default function CreateProduct() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <BackButton />
      <div className="my-6">
        <Card className=" max-w-lg ">
          <CardHeader>
            <Heading title="Create Product" description="Add a new product" />
          </CardHeader>
          <CardContent>
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

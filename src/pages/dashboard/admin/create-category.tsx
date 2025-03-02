import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import CategoryForm from "@/features/category/components/category-form";

export default function CreateCategory() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <BackButton />
      <div className="my-6">
        <Card className=" max-w-lg ">
          <CardHeader>
            <Heading title="Create category" description="Add a new category" />
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

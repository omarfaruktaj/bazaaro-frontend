import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import ShopForm from "@/features/shop/components/shop-form";
import { PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { useGetMyShopsQuery } from "../../features/shop/shop-api";

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetMyShopsQuery(null);
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  if (isLoading) return <Loading />;

  if (!data) return <p>No data found.</p>;

  return (
    <div>
      <Card className="max-w-2xl">
        <div className="flex  items-center justify-end ">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={handleEdit}
            aria-label="Edit Shop Info"
          >
            {isEditing ? (
              <X className="w-5 h-5" />
            ) : (
              <PencilIcon className="w-5 h-5" />
            )}
          </Button>
        </div>
        {isEditing ? (
          <CardContent>
            <ShopForm
              initialData={data}
              onSuccess={() => setIsEditing(false)}
            />
          </CardContent>
        ) : (
          <CardHeader>
            <div className=" w-32 h-32 rounded-full overflow-hidden border hover:shadow-md transition-shadow mb-3">
              <img
                className="object-cover w-full h-full"
                src={data.logo || "https://via.placeholder.com/150"}
              />
            </div>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </CardHeader>
        )}
      </Card>
    </div>
  );
}

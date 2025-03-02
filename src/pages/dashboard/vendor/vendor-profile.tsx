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
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyShopsQuery(null);
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  if (isLoading) return <Loading />;

  if (!data) {
    navigate("/dashboard/vendor/setup");
    return;
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Card className="max-w-2xl w-full">
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
          <CardHeader className=" flex items-center ">
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

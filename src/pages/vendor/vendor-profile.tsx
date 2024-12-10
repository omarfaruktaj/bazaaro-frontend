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
      <VendorDashboard />
    </div>
  );
}

const VendorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Vendor Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="hover:text-blue-400">
                Shop Info
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-blue-400">
                Product Management
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-blue-400">
                Order History
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-blue-400">
                Customer Reviews
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Shop Info Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Shop Info</h3>
            <p className="mb-2">Name: My Vendor Shop</p>
            <p className="mb-2">Description: Best products in the market</p>
            <p className="mb-2">Location: New York, USA</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
              Edit Shop Info
            </button>
          </div>

          {/* Product Management Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Product Management</h3>
            <p className="mb-2">Add, Edit, or Delete your products here</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
              Manage Products
            </button>
          </div>

          {/* Order History Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Order History</h3>
            <p className="mb-2">View all past orders placed for your shop.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
              View Orders
            </button>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <p className="mb-2">
              View and respond to customer feedback on your products.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
              View Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

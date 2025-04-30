import OrdersTab from "@/components/profile/orders-tab";
import PaymentTab from "@/components/profile/payment-tab";
import ProfileHeader from "@/components/profile/profile-header";
import { ReviewsTab } from "@/components/profile/review-tab";
import SettingsTab from "@/components/profile/settings-tab";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectUser } from "@/features/auth/auth-slice";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const user = useAppSelector(selectUser);

  if (!user?.profile) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <ProfileHeader user={user} />
      </div>

      <Tabs
        defaultValue="orders"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment</TabsTrigger>
        </TabsList>

        <Card className="p-4 md:p-6">
          <TabsContent value="orders" className="mt-0">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsTab />
          </TabsContent>

          <TabsContent value="wishlist" className="mt-0">
            wishList will display here
          </TabsContent>

          <TabsContent value="payment-methods" className="mt-0">
            <PaymentTab />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}

import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import CouponForm from "@/features/coupon/components/coupon-form";

export default function CreateCoupon() {
  return (
    <div className="p-6 sm:p-8 lg:p-10 ">
      <BackButton />

      <div className="my-8 flex justify-center">
        <Card className="w-full sm:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-xl p-6">
          <CardHeader>
            <Heading
              title="Create New Coupon"
              description="Add a new coupon to offer discounts to your customers"
            />
          </CardHeader>

          <CardContent className="pt-6">
            <CouponForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

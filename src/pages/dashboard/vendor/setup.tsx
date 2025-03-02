import { Heading } from "@/components/ui/heading";
import Loading from "@/components/ui/loading";
import ShopForm from "@/features/shop/components/shop-form";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Setup() {
  const { data, isLoading } = useGetMyShopsQuery(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/dashboard/vendor/shop-info");
    }
  }, [data, navigate]);
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-lg">
      <div className="p-6 sm:p-8 lg:p-10 ">
        <div className="my-8 ">
          <Heading title="Please setup your shop" description="" />

          <ShopForm />
        </div>
      </div>
    </div>
  );
}

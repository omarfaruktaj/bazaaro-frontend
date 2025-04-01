import BackButton from "@/components/ui/back-button";
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
    <div className="max-w-4xl mx-auto mt-8">
      <BackButton onClick={() => navigate("/")} />
      <div className="  p-6 bg-white shadow-lg rounded-lg">
        <div className="space-y-8">
          <Heading
            title="Please setup your shop"
            description="Fill in the details below to set up your shop."
          />

          <ShopForm />
        </div>
      </div>
    </div>
  );
}

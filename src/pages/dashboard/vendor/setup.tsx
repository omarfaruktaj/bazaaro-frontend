import { Heading } from "@/components/ui/heading";
import Loading from "@/components/ui/loading";
import ShopForm from "@/features/shop/components/shop-form";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Setup() {
  const { data, isLoading } = useGetMyShopsQuery(null);
  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    if (data) {
      navigate("/vendor/profile");
    }
  }, [data, navigate]);
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-lg">
      <Heading title="Please setup your shop" description="" />
      <ShopForm />
    </div>
  );
}

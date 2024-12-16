import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { runFireworks } from "@/utils/run-firewords";
import { useEffect } from "react";
import { Link } from "react-router";

export default function PaymentSuccess() {
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen ">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 text-center">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg text-center">
            Thank you for your payment. Your transaction has been completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            <Button variant={"default"}>
              <Link to={"/"}>Return to Home</Link>
            </Button>
            <Button variant={"outline"}>
              <Link to={"/products"}>Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

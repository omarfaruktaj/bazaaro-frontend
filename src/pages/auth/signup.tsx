import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/features/auth/components/signup-form";
export default function SignUp() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <BackButton />
      </div>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="vendor">Vendor</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <Card className="w-full  shadow-lg rounded-lg border ">
            <CardHeader className=" p-4 rounded-t-lg">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                Sign Up
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vendor">
          <Card className="w-full  shadow-lg rounded-lg border ">
            <CardHeader className=" p-4 rounded-t-lg">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                Sign Up
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <SignUpForm isVendor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

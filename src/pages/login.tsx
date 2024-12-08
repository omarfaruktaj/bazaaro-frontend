import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/features/auth/components/login-form";

export default function Login() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <BackButton />
      </div>

      <Card className="w-full  shadow-lg rounded-lg border ">
        <CardHeader className=" p-4 rounded-t-lg">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

import BackButton from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/features/auth/components/login-form";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md">
      <BackButton onClick={() => navigate("/")} />
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl"> Welcome Back!</CardTitle>
          <CardDescription>Log in to continue sloping</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

import BackButton from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div>
      <BackButton />
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Your Password?</CardTitle>
          <CardDescription>
            Don’t worry! Just enter your email address below, and we’ll send you
            email to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";

export default function ResetPassword() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
}

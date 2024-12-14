import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import ChangePasswordForm from "@/features/auth/components/change-password-form";

export default function ChangePassword() {
  return (
    <div className="w-full max-w-md">
      <BackButton />
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Heading
            title="Change Your Password"
            description="Ensure your password is strong and unique to keep your account secure."
          />
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

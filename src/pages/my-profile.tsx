import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectUser } from "@/features/auth/auth-slice";
import ProfileForm from "@/features/user/components/profile-form";
import { PencilIcon, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!user || !user.profile) {
    navigate("/");
    return;
  }

  return (
    <div className="container mx-auto p-8">
      <BackButton />
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        My profile
      </h1>
      <div className="flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <div className="flex items-center justify-end">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full"
              onClick={handleEdit}
              aria-label="Edit Profile"
            >
              {isEditing ? (
                <X className="w-5 h-5" />
              ) : (
                <PencilIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
          {isEditing ? (
            <CardContent>
              <ProfileForm
                initialData={{
                  name: user?.profile.name || "",
                  address: user?.profile.address || "",
                  bio: user?.profile.bio || "",
                  phone: user?.profile.phone || "",
                  avatar: user?.profile.avatar || "",
                }}
                onSuccess={() => setIsEditing(false)}
              />
            </CardContent>
          ) : (
            <CardHeader className="flex items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border hover:shadow-md transition-shadow mb-3">
                <img
                  className="object-cover w-full h-full"
                  src={user.profile.avatar || "https://via.placeholder.com/150"}
                  alt="Profile Avatar"
                />
              </div>
              <div className="ml-4">
                <CardTitle className="text-center">
                  {user.profile.name}
                </CardTitle>
                <p>{user.email}</p>
                {user.profile.bio && (
                  <CardDescription>{user.profile.bio}</CardDescription>
                )}
                {user.profile.address && (
                  <div className="mt-2 text-sm">
                    Address: {user.profile.address}
                  </div>
                )}
                {user.profile.phone && (
                  <div className="mt-2 text-sm">
                    Phone: {user.profile.phone}
                  </div>
                )}
              </div>
            </CardHeader>
          )}
        </Card>
      </div>
    </div>
  );
}

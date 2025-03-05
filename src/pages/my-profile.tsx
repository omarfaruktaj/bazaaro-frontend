import { Mail, MapPin, PencilIcon, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { selectUser } from "@/features/auth/auth-slice";
import ProfileForm from "@/features/user/components/profile-form";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!user || !user.profile) {
    navigate("/");
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            My Profile
          </h1>

          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative h-32 bg-gradient-to-r from-primary/80 to-primary">
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 rounded-full shadow-md"
                onClick={handleEdit}
                aria-label={isEditing ? "Cancel editing" : "Edit profile"}
              >
                {isEditing ? (
                  <X className="w-4 h-4 mr-1" />
                ) : (
                  <PencilIcon className="w-4 h-4 mr-1" />
                )}
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {isEditing ? (
              <CardContent className="pt-16">
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
              <>
                <div className="relative px-6">
                  <Avatar className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-white dark:border-gray-800 shadow-md">
                    <AvatarImage
                      src={
                        user.profile.avatar || "https://via.placeholder.com/150"
                      }
                      alt={user.profile.name || "User"}
                    />
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {user.profile.name ? (
                        getInitials(user.profile.name)
                      ) : (
                        <User />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <CardHeader className="pt-20 text-center">
                  <CardTitle className="text-2xl font-bold">
                    {user.profile.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <Mail className="inline w-4 h-4 mr-1 mb-1" /> {user.email}
                  </CardDescription>

                  {user.profile.bio && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      {user.profile.bio}
                    </p>
                  )}
                </CardHeader>

                <CardContent>
                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.profile.address && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Address
                          </h3>
                          <p className="text-gray-900 dark:text-white">
                            {user.profile.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {user.profile.phone && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Phone
                          </h3>
                          <p className="text-gray-900 dark:text-white">
                            {user.profile.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

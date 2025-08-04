"use client";

import VendorPreferences from "@/components/preferences";
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
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectUser } from "@/features/auth/auth-slice";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import ProfileForm from "@/features/user/components/profile-form";
import { motion } from "framer-motion";
import {
  KeyRound,
  Lock,
  Mail,
  MapPin,
  PencilIcon,
  Phone,
  Shield,
  User,
  UserCog,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <UserCog className="h-5 w-5 text-primary" />
        </div>
        <Heading
          title="Settings"
          description="Manage your account preferences and settings"
        />
      </div>

      <Tabs defaultValue="security" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-6">
          {user && user.profile && (
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="security" className="space-y-4 mt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="border shadow-sm">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <KeyRound className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Change Your Password</CardTitle>
                        <CardDescription>
                          Update your password to keep your account secure
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ChangePasswordForm />
                  </CardContent>
                </Card>

                <Card className="border shadow-sm mt-8">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>
                          Add an extra layer of security to your account
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      Two-factor authentication adds an extra layer of security
                      to your account by requiring more than just a password to
                      sign in.
                    </p>
                    <Button className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card className="border shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Security Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary text-xs font-bold">
                            1
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Use a <strong>strong, unique password</strong> that
                          you don't use for other accounts.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary text-xs font-bold">
                            2
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Enable <strong>two-factor authentication</strong> for
                          an additional layer of security.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary text-xs font-bold">
                            3
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Regularly update</strong> your password every
                          3-6 months.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary text-xs font-bold">
                            4
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Never share</strong> your password or
                          verification codes with anyone.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Password changed
                          </p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Mail className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email verified</p>
                          <p className="text-xs text-gray-500">1 month ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        <TabsContent value="preferences">
          <VendorPreferences />
        </TabsContent>

        {user && user.profile && (
          <TabsContent value={"profile"}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              // className="flex items-center justify-center h-64 bg-white rounded-lg border border-dashed border-gray-300"
            >
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
                          aria-label={
                            isEditing ? "Cancel editing" : "Edit profile"
                          }
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
                                  user.profile.avatar ||
                                  "https://via.placeholder.com/150"
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
                              <Mail className="inline w-4 h-4 mr-1 mb-1" />{" "}
                              {user.email}
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
            </motion.div>
          </TabsContent>
        )}

        {["notifications", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-64 bg-white rounded-lg border border-dashed border-gray-300"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Settings
                </h3>
                <p className="text-sm text-gray-500">
                  This section is under development
                </p>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Shield,
  User,
  UserCog,
} from "lucide-react";

export default function Settings() {
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
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger
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
          </TabsTrigger>
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

        {["profile", "notifications", "billing", "preferences"].map((tab) => (
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

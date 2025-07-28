import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/redux/hooks";
import type { User } from "@/types";
import type { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LucideShield, LucideShoppingBag, LucideUser } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoginMutation } from "../auth-api";
import { setToken, setUser } from "../auth-slice";
import { type TLoginSchema, loginSchema } from "../schemas";
import { useLocation } from "react-router";
export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect");

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const demoCredentials = {
    user: { email: "customer@gmail.com", password: "123456" },
    admin: { email: "admin@gmail.com", password: "123456" },
    vendor: { email: "vendor@gmail.com", password: "123456" },
  };

  const handleDemoLogin = (role: "user" | "admin" | "vendor") => {
    form.setValue("email", demoCredentials[role].email);
    form.setValue("password", demoCredentials[role].password);

    // Submit the form automatically after setting values
    setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 100);
  };

  async function onSubmit(values: TLoginSchema) {
    try {
      const res = (await login({
        ...values,
      })) as Response<{ accessToken: string; user: User }>;

      if (res.error) {
        toast.error(
          res.error?.data.message || "Login failed. Please try again."
        );
      } else if (res.data) {
        toast.success("You've successfully logged in.");
        dispatch(
          setToken({ accessToken: res.data?.data?.accessToken as string })
        );
        dispatch(setUser(res.data?.data.user as User));
        if (redirectPath) {
          navigate(redirectPath);
        } else if (res.data?.data.user.role === "VENDOR") {
          navigate("/dashboard/vendor/shop-info");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("An unknown error occurred.");
      console.error("Login failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          loading={isLoading}
          type="submit"
          className="w-full h-11 text-base font-medium"
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </LoadingButton>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            or try demo accounts
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <LucideUser className="h-5 w-5" />
              <span className="text-xs">Customer</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDemoLogin("vendor")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <LucideShoppingBag className="h-5 w-5" />
              <span className="text-xs">Vendor</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="w-full h-auto py-3 flex flex-col items-center justify-center gap-1 border-muted-foreground/20"
            >
              <LucideShield className="h-5 w-5" />
              <span className="text-xs">Admin</span>
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?</span>{" "}
          <Button variant="link" asChild className="p-0 h-auto font-medium">
            <Link to="/signup">Sign up here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

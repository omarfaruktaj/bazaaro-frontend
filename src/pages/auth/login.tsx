import BackButton from "@/components/ui/back-button";
import LoginForm from "@/features/auth/components/login-form";
import { motion } from "framer-motion";
import { LucideShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <BackButton onClick={() => navigate("/")} />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6 rounded-xl overflow-hidden ">
        {/* Left side - Illustration/Brand section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-primary p-8 text-primary-foreground">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground">
              <LucideShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Bazaro</h1>
            <p className="mb-8 text-lg opacity-90">
              Your one-stop shopping destination
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <span className="text-primary text-lg font-bold">1</span>
                </div>
                <p>Browse thousands of quality products</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <span className="text-primary text-lg font-bold">2</span>
                </div>
                <p>Secure checkout and fast delivery</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <span className="text-primary text-lg font-bold">3</span>
                </div>
                <p>Track orders and manage your account</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-card p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-center md:justify-start">
            <div className="md:hidden mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <LucideShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
          </div>

          <p className="mb-8 text-muted-foreground">
            Log in to continue shopping and manage your orders
          </p>

          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}

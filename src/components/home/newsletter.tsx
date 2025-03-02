"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    console.log("Submitted email:", email);
    setIsSubmitted(true);
    setError("");
  };

  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold  sm:text-4xl">
          Stay in the loop
        </h2>
        <p className="mt-4 text-lg  ">
          Subscribe to our newsletter for exclusive deals, new arrivals, and
          insider-only discounts.
        </p>
        <div className="mt-8">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="sm:flex sm:items-center sm:justify-center"
            >
              <div className="w-full sm:max-w-xs">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 " aria-hidden="true" />
                  </div>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <Button type="submit" variant={"outline"}>
                  Subscribe
                </Button>
              </div>
            </form>
          ) : (
            <div className=" text-xl font-semibold">
              Thank you for subscribing!
            </div>
          )}
          {error && <p className="mt-2 text-red-200">{error}</p>}
        </div>
        <p className="mt-4 text-sm ">
          We care about your data. Read our Privacy Policy .
        </p>
      </div>
    </section>
  );
}

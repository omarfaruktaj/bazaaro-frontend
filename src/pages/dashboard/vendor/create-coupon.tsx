import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import CouponForm from "@/features/coupon/components/coupon-form";
import { motion } from "framer-motion";
import { ArrowLeft, Gift, Tag, Ticket, Zap } from "lucide-react";
import { Link } from "react-router";

export default function CreateCoupon() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <BackButton />
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Coupon</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b">
                  <Heading
                    title="Create New Coupon"
                    description="Add a new coupon to offer discounts to your customers"
                    icon={<Ticket className="h-5 w-5 text-primary mt-2" />}
                  />
                </div>
                <CardContent className="p-6">
                  <CouponForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-blue-700 flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Coupon Best Practices
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            1
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Use <strong>memorable, easy-to-type codes</strong>{" "}
                          like "SUMMER25" or "WELCOME10".
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            2
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Set a <strong>clear expiration date</strong> to create
                          urgency.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            3
                          </span>
                        </div>
                        <p className="text-gray-600">
                          For percentage discounts, <strong>15-25%</strong> is
                          typically effective without cutting too much into
                          profits.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            4
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Use <strong>fixed amount discounts</strong> (like $10
                          off) for higher-priced items.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-blue-600 text-xs font-bold">
                            5
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Promote your coupons through{" "}
                          <strong>email, social media, and your website</strong>{" "}
                          to maximize usage.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 shadow-md rounded-xl overflow-hidden">
                  <div className="bg-amber-50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-amber-700 flex items-center">
                      <Gift className="h-5 w-5 mr-2" />
                      Coupon Ideas
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <Tag className="h-4 w-4 text-primary mr-2" />
                          <h4 className="font-medium text-gray-800">
                            Welcome Discount
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Offer 10-15% off for first-time customers to encourage
                          initial purchases.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <Tag className="h-4 w-4 text-primary mr-2" />
                          <h4 className="font-medium text-gray-800">
                            Seasonal Promotion
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Create limited-time offers for holidays or special
                          seasons to drive sales.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-1">
                          <Tag className="h-4 w-4 text-primary mr-2" />
                          <h4 className="font-medium text-gray-800">
                            Loyalty Reward
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Reward repeat customers with exclusive discounts to
                          encourage retention.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dashboard/vendor/coupons"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Coupons
          </Link>
        </div>
      </div>
    </div>
  );
}

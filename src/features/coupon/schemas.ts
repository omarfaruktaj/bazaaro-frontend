import { z } from "zod";

const DiscountTypeEnum = z.enum(["PERCENTAGE", "FIXED"]);

const CouponSchemaBase = z.object({
  code: z.string().min(1, { message: "Coupon code is required" }),
  discountType: DiscountTypeEnum,
  discountValue: z.coerce
    .number()
    .positive({ message: "Discount value must be positive" }),
  startDate: z.date(),
  endDate: z.date(),
});

export const CouponSchema = CouponSchemaBase.refine(
  (val) => val.endDate > val.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export const UpdateCouponSchema = CouponSchemaBase.partial().refine(
  (val) => {
    if (val.startDate && val.endDate) {
      return val.endDate > val.startDate;
    }
    return true;
  },
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export type CouponSchemaType = z.infer<typeof CouponSchema>;
export type UpdateCouponSchemaType = z.infer<typeof UpdateCouponSchema>;

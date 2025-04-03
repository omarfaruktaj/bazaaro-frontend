"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import LoadingButton from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UploadMultiImage from "@/components/upload-multi-image";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import type { Product } from "@/types";
import type { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  DollarSign,
  Info,
  Percent,
  ShoppingBag,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../product-api";
import { ProductSchema, type ProductSchemaType } from "../schemas";

interface ProductFormProps {
  initialData?: ProductSchemaType & { id: string };
  onSuccess?: () => void;
  isDuplicate?: boolean;
}

export default function ProductForm({
  initialData,
  onSuccess,
  isDuplicate,
}: ProductFormProps) {
  const [create, { isLoading }] = useCreateProductMutation();
  const [update, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data, isLoading: isCategoryLoading } = useGetCategoriesQuery(null);
  const { data: shop, isLoading: shopLoading } = useGetMyShopsQuery(null);

  const action = initialData ? "Save changes" : "Create Product";
  const actionLoading = initialData
    ? "Saving changes..."
    : "Creating product...";

  const navigate = useNavigate();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          discount: initialData.discount ? initialData.discount : 0,
        }
      : {
          name: "",
          description: "",
          images: [],
          categoryId: "",
          discount: 0,
          price: 0,
          quantity: 0,
        },
  });

  if (shopLoading) return <Loading />;

  if (!shop?.id) {
    toast.error("Shop ID is missing. Please ensure your shop is set up.");
    return null;
  }

  async function onSubmit(values: ProductSchemaType) {
    if (initialData && isDuplicate) {
      const res = (await create({
        ...values,
        shopId: shop!.id,
      })) as Response<Product>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Product duplicating failed. Please try again."
        );
      } else {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Product successfully duplicated");
      }
    } else if (initialData) {
      const res = (await update({
        data: { ...values, shopId: shop!.id },
        productId: initialData.id,
      })) as Response<Product>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Product updating failed. Please try again."
        );
      } else {
        if (onSuccess) {
          onSuccess();
        }
        toast.success("Product successfully updated");
      }
    } else {
      const res = (await create({
        ...values,
        shopId: shop!.id,
      })) as Response<Product>;

      if (res.error) {
        toast.error(
          res.error?.data.message ||
            "Product creating failed. Please try again."
        );
      } else {
        toast.success("Product successfully created");
        navigate("/dashboard/vendor/products");
      }
    }
  }

  // Calculate sale price with discount
  const regularPrice = form.watch("price") || 0;
  const discountPercent = form.watch("discount") || 0;
  const salePrice = regularPrice - regularPrice * (discountPercent / 100);

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center mb-2">
              <ShoppingBag className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="flex items-center">
                      Product Name
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            Use a clear, descriptive name that includes key
                            product features.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        disabled={isLoading || isUpdating}
                        placeholder="e.g. Premium Leather Wallet"
                        {...field}
                        aria-label="Product Name"
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="categoryId"
                      className="flex items-center"
                    >
                      Category
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Choose the most specific category that applies to
                            your product.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      disabled={isLoading || isUpdating || isCategoryLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="description"
                    className="flex items-center"
                  >
                    Description
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Write a detailed description highlighting benefits,
                          features, and specifications.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      disabled={isLoading || isUpdating}
                      placeholder="Describe your product in detail, including features, materials, dimensions, etc."
                      className="min-h-32 focus-visible:ring-primary"
                      {...field}
                      aria-label="Product Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pricing & Inventory Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Pricing & Inventory</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price" className="flex items-center">
                      Regular Price
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="price"
                          disabled={isLoading || isUpdating}
                          type="number"
                          placeholder="0.00"
                          className="pl-10 focus-visible:ring-primary"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          aria-label="Product Price"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="discount" className="flex items-center">
                      Discount (%)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="discount"
                          disabled={isLoading || isUpdating}
                          type="number"
                          placeholder="0"
                          className="pl-10 focus-visible:ring-primary"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          aria-label="Product Discount"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="quantity" className="flex items-center">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="quantity"
                        disabled={isLoading || isUpdating}
                        type="number"
                        placeholder="0"
                        className="focus-visible:ring-primary"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        aria-label="Product Quantity"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {discountPercent > 0 && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="flex items-center">
                  Sale price:{" "}
                  <span className="font-bold ml-1">
                    ${salePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm line-through text-gray-500">
                    ${regularPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Images Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <ShoppingBag className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">Product Images</h3>
            </div>

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Images
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">
                          Upload high-quality images from multiple angles. First
                          image will be the main product image.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <UploadMultiImage
                      value={field.value}
                      disabled={isLoading || isUpdating}
                      onChange={(urls) =>
                        field.onChange([...field.value, ...urls])
                      }
                      onRemove={(url) =>
                        field.onChange(
                          field.value.filter((current) => current !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <LoadingButton
              loading={isLoading || isUpdating}
              type="submit"
              className="w-full py-6 text-lg"
              aria-label={isLoading || isUpdating ? actionLoading : action}
            >
              {isLoading || isUpdating ? actionLoading : action}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}

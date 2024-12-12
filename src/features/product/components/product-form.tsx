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
import UploadMultiImage from "@/components/upload-multi-image";
import { useGetCategoriesQuery } from "@/features/category/category-api";
import { useGetMyShopsQuery } from "@/features/shop/shop-api";
import { Product } from "@/types";
import { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../product-api";
import { ProductSchema, ProductSchemaType } from "../schemas";

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

  const action = initialData ? "Save changes" : "Create";
  const actionLoading = initialData ? "Saving changes..." : "Creating...";

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
    return;
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  disabled={isLoading || isUpdating}
                  placeholder="Enter product name"
                  {...field}
                  aria-label="Product Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="price">Price</FormLabel>
              <FormControl>
                <Input
                  id="price"
                  disabled={isLoading || isUpdating}
                  type="number"
                  placeholder="Enter product price"
                  {...field}
                  aria-label="Product Price"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  disabled={isLoading || isUpdating}
                  placeholder="Enter product description"
                  {...field}
                  aria-label="Product Description"
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
            <FormItem className="col-span-2">
              <FormLabel htmlFor="categoryId">Category</FormLabel>
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

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <FormControl>
                <Input
                  id="quantity"
                  disabled={isLoading || isUpdating}
                  type="number"
                  placeholder="Enter quantity"
                  {...field}
                  aria-label="Product Quantity"
                />
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
              <FormLabel htmlFor="discount">Discount (%)</FormLabel>
              <FormControl>
                <Input
                  id="discount"
                  disabled={isLoading || isUpdating}
                  type="number"
                  placeholder="Enter discount percentage"
                  {...field}
                  aria-label="Product Discount"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <UploadMultiImage
                  value={field.value}
                  disabled={isLoading || isUpdating}
                  onChange={(urls) => field.onChange([...field.value, ...urls])}
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

        <div className="col-span-2">
          <LoadingButton
            loading={isLoading || isUpdating}
            type="submit"
            className="w-full"
            aria-label={isLoading || isUpdating ? actionLoading : action}
          >
            {isLoading || isUpdating ? actionLoading : action}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

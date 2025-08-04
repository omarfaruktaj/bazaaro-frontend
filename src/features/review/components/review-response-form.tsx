import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { ShopReviewResponse } from "@/types";
import { Response } from "@/types/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateReviewResponseMutation,
  useUpdateReviewResponseMutation,
} from "../review-api";
import { ReviewResponseSchema, ReviewResponseSchemaType } from "../schemas";

interface ReviewFormProps {
  reviewId?: string;
  responseId?: string;
  initialReviewResponseData?: ReviewResponseSchemaType;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export default function ReviewResponseForm({
  responseId,
  reviewId,
  initialReviewResponseData,
  onSuccess,
  isLoading = false,
}: ReviewFormProps) {
  const [createReviewResponse, { isLoading: isCreating }] =
    useCreateReviewResponseMutation();
  const [updateReviewResponse, { isLoading: isUpdating }] =
    useUpdateReviewResponseMutation();

  const form = useForm({
    resolver: zodResolver(ReviewResponseSchema),
    defaultValues: initialReviewResponseData || {
      response: "",
    },
  });

  const action = responseId ? "Update response" : "Submit response";
  const actionLoading = responseId
    ? "Updating response..."
    : "Submitting response...";

  const handleSubmit = async (values: ReviewResponseSchemaType) => {
    console.log(values);
    try {
      if (responseId) {
        const res = (await updateReviewResponse({
          data: values,
          responseId,
        })) as Response<ShopReviewResponse>;

        if (res.error) {
          toast.error(
            res.error?.data.message ||
              "Error updating response. Please try again."
          );
        } else {
          toast.success("Response updated successfully!");
          onSuccess?.();
        }
      } else {
        if (!reviewId) {
          toast.error("reviewId is require.");
          return;
        }

        const res = (await createReviewResponse({
          data: values,
          reviewId,
        })) as Response<ShopReviewResponse>;

        if (res.error) {
          toast.error(
            res.error?.data.message ||
              "Error submitting response. Please try again."
          );
        } else if (res.data) {
          toast.success("Response submitted successfully!");
          onSuccess?.();
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 "
      >
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="response">Your Review</FormLabel>
              <FormControl>
                <Textarea
                  id="response"
                  disabled={isLoading || isCreating || isUpdating}
                  placeholder="Share your thoughts about this product..."
                  {...field}
                  rows={4}
                  aria-label="Review"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <LoadingButton
            loading={isCreating || isUpdating}
            type="submit"
            className=""
            aria-label={isCreating || isUpdating ? actionLoading : action}
          >
            {isCreating || isUpdating ? actionLoading : action}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { Ratings } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "@/features/review/review-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ReviewSchema } from "../schemas";

interface ReviewFormProps {
  productId: string;
  reviewId?: string;
  initialReviewData?: { rating: number; review?: string };
  onSuccess?: () => void;
  isLoading?: boolean;
}

export default function ReviewForm({
  productId,
  reviewId,
  initialReviewData,
  onSuccess,
  isLoading = false,
}: ReviewFormProps) {
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const form = useForm({
    resolver: zodResolver(ReviewSchema),
    defaultValues: initialReviewData || {
      rating: 0,
      review: "",
    },
  });

  const action = reviewId ? "Update Review" : "Submit Review";
  const actionLoading = reviewId
    ? "Updating Review..."
    : "Submitting Review...";

  const handleSubmit = async (values: { rating: number; review?: string }) => {
    console.log(values);
    try {
      if (reviewId) {
        const res = await updateReview({
          data: values,
          reviewId,
        }).unwrap();

        if (res.error) {
          toast.error(
            res.error?.data.message || "Review update failed. Please try again."
          );
        } else {
          toast.success("Review updated successfully");
          onSuccess?.();
        }
      } else {
        const res = await createReview({
          data: values,
          productId,
        }).unwrap();

        if (res.error) {
          toast.error(
            res.error?.data.message ||
              "Review creation failed. Please try again."
          );
        } else {
          toast.success("Review submitted successfully");
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
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="rating">Rating</FormLabel>
              <FormControl>
                <Ratings rating={field.value} onRatingChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="review">Your Review</FormLabel>
              <FormControl>
                <Textarea
                  id="review"
                  disabled={isLoading || isCreating || isUpdating}
                  placeholder="Share your thoughts about this product..."
                  {...field}
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
            className="w-full"
            aria-label={isCreating || isUpdating ? actionLoading : action}
          >
            {isCreating || isUpdating ? actionLoading : action}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}

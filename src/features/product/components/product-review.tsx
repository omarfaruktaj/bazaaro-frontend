import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ratings } from "@/components/ui/rating";
import { Review } from "@/types";

export default function ProductReview({ review }: { review: Review }) {
  return (
    <div key={review.id} className="border-b pb-6 mb-6 last:border-none">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={review?.user?.profile?.avatar as string} />
          <AvatarFallback>{review?.user?.profile?.name}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Ratings
                rating={review.rating}
                totalStars={5}
                size={20}
                variant="default"
                disabled={true}
              />
              <span className="text-sm text-muted-foreground">{"omar"}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700">{review.review}</p>
          {review.reviewResponse && (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm text-muted-foreground">
                  Vendor's Response:
                </span>
              </div>
              <p className=" mt-2">{review.reviewResponse.response}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(review.reviewResponse.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

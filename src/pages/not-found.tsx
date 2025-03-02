import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        <h1 className="text-6xl font-bold ">404</h1>
        <p className="text-2xl font-semibold  mt-2">Oops! Page Not Found</p>
        <p className="text-lg text-muted-foreground mt-4">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <div className="mt-6">
          <Button>
            <Link to="/">
              <div className="flex items-center justify-center gap-2">
                <MoveLeft /> Back to Home
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

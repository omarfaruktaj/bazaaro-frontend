import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4">Oops! Page not found</p>
        <p className="text-muted-foreground mt-2 text-base">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-6">
          <Link to="/">
            <Button variant="outline" className="group">
              <MoveLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

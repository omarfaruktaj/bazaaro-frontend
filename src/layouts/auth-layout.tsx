import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
}

import { ThemeProvider } from "@/components/theme-provider";
import Loading from "@/components/ui/loading";
import { setUser } from "@/features/auth/auth-slice";
import { useGetMeQuery } from "@/features/user/user-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function RootLayout() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery(null, { skip: !token });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
      </ThemeProvider>
    </div>
  );
}

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "@/components/ui/loading";
import { logOut, setUser } from "@/features/auth/auth-slice";
import { useGetMeQuery } from "@/features/user/user-api";
import { useNavigate } from "react-router";

export default function PrivateRoute({
  children,
  requiredRoles,
}: {
  children: ReactNode;
  requiredRoles?: ("ADMIN" | "VENDOR" | "CUSTOMER")[];
}) {
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetMeQuery(null, {
    skip: !token,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (!isLoading && !token && !user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [token, isLoading, navigate, user]);

  useEffect(() => {
    if (
      !isLoading &&
      requiredRoles &&
      user &&
      !requiredRoles.includes(user?.role)
    ) {
      toast.warning("You have no access to this route. Please login again.");
      dispatch(logOut());
      navigate("/login");
    }
  }, [requiredRoles, user, isLoading, dispatch, navigate]);

  if (isLoading || loading) {
    return <Loading />;
  }

  if (!user && !userData) {
    navigate("/login");
    return null;
  }

  return <div>{children}</div>;
}

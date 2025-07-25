import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/features/auth/model/slice";
import { useEffect } from "react";

interface Props {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    console.log('children' , children)
  const dispatch = useDispatch();
  const location = useLocation();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("accessToken");
    if (!tokenInStorage && accessToken) {
      dispatch(logout());
    }
  }, [accessToken, dispatch, location]);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

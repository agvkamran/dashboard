import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/app/store";
import { LoginForm } from "@/features/auth/ui/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Вход</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthFromStorage } from "@/features/auth/model/thunks";
import { AppDispatch, RootState } from "@/app/store";
import { Header } from "@/widgets/Header/ui/Header";
import LoginPage from "@/pages/LoginPage";
// import DashboardPage from "@/pages/DashboardPage";
import { PublicRoute } from "@/shared/routes/PublicRoute";
import { PrivateRoute } from "@/shared/routes/PrivateRoute";
import DashboardPage from "@/pages/DashboardPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { authIsReady } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  if (!authIsReady) return null;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

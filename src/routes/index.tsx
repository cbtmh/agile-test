import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import AuthLayout from "../components/layout/authLayout";
import DefaultLayout from "../components/layout/defaultLayout";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import ProtectedRoute from "../components/utils/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route
        path="/profile"
        element={
          <AuthLayout>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </AuthLayout>
        }
      />
    </Routes>
  );
}
export default AppRoutes;
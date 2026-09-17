import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserAuthProvider } from "./context/UserAuthContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import ManageSocials from "./admin/ManageSocials.jsx";
import ManageServices from "./admin/ManageServices.jsx";
import ManageVideos from "./admin/ManageVideos.jsx";
import ManageMessages from "./admin/ManageMessages.jsx";
import ManageSubscriptions from "./admin/ManageSubscriptions.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function App() {
  return (
    <UserAuthProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="socials" element={<ManageSocials />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="videos" element={<ManageVideos />} />
              <Route path="messages" element={<ManageMessages />} />
              <Route path="subscriptions" element={<ManageSubscriptions />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </UserAuthProvider>
  );
}

export default App;
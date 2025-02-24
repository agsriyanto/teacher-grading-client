import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

import { authAtom } from "./store/authAtom";

const ProtectedRoute = () => {
  const [auth] = useAtom(authAtom);

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

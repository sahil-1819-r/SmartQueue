import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  return user ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;

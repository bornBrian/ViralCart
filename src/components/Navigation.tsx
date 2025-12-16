import { useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  if (isAdmin) return null;

  return null; // Navigation removed - Hero acts as header
}

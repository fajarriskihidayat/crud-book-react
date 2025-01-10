import { useLocation } from "react-router-dom";

const isLocation = (path: string) => {
  const location = useLocation();
  return location.pathname === path;
};

export default isLocation;

import { useNavigate } from "react-router-dom";
import userInfoQueryStore from "./userStore.ts";
import { useToast } from "@chakra-ui/react";
const PrivateRoute = ({ children }) => {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const navigate = useNavigate();
  const toast = useToast();
  // Check if the user is not logged in
  if (!userInfo.token) {
    // console.log("User is not logged in");
    toast({
      title: "Please login to access this page",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    navigate("/"); // Redirect to homepage
    // togglePopup(true, "accountType");
    return null;
  }
  // If logged in, render the children components
  return children;
};
export default PrivateRoute;

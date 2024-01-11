import UserInfoContent from "../../components/user-info/user-info/user-info";
import "./user-info.styles.scss";
import userInfoQueryStore from "../../userStore.ts";

import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const navigate = useNavigate();
  // 一种解决方案：重定向
  if (!userInfo.token) {
    alert("You are not logged in");
    navigate("/"); // Redirecting to the homepage
    return null; // Return null or any other placeholder component if you prefer
  }
  // 另一种：返回一个default user profile page
  return (
    <div className="user-info-container">
      <UserInfoContent />
    </div>
  );
};

export default UserInfo;

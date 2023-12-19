import { useNavigate } from 'react-router-dom';
import userInfoQueryStore from './userStore.ts';

const PrivateRoute = ({ children }) => {
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const navigate = useNavigate();
    // Check if the user is not logged in
    if (!userInfo.token) {
      //alert("You are not logged in");
      navigate('/'); // Redirect to homepage
      return null;
    }
    // If logged in, render the children components
    return children;
}
export default PrivateRoute;
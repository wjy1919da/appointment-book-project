// components
import UserProfileBasic from '../user-profile-basic/user-profile-basic';
import UserProfileSubArea from '../user-profile-subArea/user-profile-subArea';
import Footer from '../footer/footer.component';

// scss
import './user-profile-page.style.scss';

const UserProfilePage = () => {
  return (
    <div className='user-profile-outter-container'>
      <div className='user-profile-page-container'>
        <UserProfileBasic />
        <UserProfileSubArea />
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;

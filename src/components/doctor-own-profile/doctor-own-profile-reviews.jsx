import UserProfileReviewCard from '../user-profile-review-card/user-profile-review-card';

const DocotorOwnReview = () => {
  return (
    <div className='doctor-profile-review' style={{ marginTop: '50px' }}>
      <span
        style={{
          fontFamily: 'Open Sans',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '600',
          color: '#000',
        }}
      >
        Customer Review
      </span>
      <UserProfileReviewCard />
      <UserProfileReviewCard />
      <UserProfileReviewCard />
      <UserProfileReviewCard />
    </div>
  );
};

export default DocotorOwnReview;

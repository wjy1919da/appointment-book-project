import './follow-button.styles.scss';

const FollowButton = ({title, onClick}) => {
    const handleClick = () => {onClick()};
    return <button className='Follow-button' onClick={handleClick}>
        {title}
    </button>;
};

export default FollowButton;
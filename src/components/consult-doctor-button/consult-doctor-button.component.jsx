import './consult-doctor-button.styles.scss';

const ConsultDoctorButton = ({title, onClick}) => {
    const handleClick = () => {onClick()};
    return <button className='consult-doctor-button' onClick={handleClick}>
        {title}
    </button>;
};
export default ConsultDoctorButton;
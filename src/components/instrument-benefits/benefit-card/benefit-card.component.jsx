import './benefit-card.styles.scss';

const BenefitCard = ({ icon, title, content}) => {
    return (
        <div className='benefit-card-container'>
            {/* <img className='benefit-card-icon' src={icon} alt={title} />
            <h6 className='benefit-card-title'>{title}</h6>
            <hr className='benefit-card-divider'/>
            <p className='benefit-card-content'>{content}</p> */}
        </div>
    )
}

export default BenefitCard;
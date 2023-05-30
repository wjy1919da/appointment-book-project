import './home-features-text.styles.scss';

const HomeFeaturesText = ({ iconPic, position, title, text }) => {
    return (
        <div className={'home-features-text-container ' + position}>
            <img className='home-features-icon' src={iconPic} alt='icon'/>
            <span className='home-features-title'>{title}</span>
            <p className='home-features-txt'>{text}</p>
        </div>
    )
}

export default HomeFeaturesText;
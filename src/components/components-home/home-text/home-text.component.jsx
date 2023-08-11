import './home-text.styles.scss'
const HomeText = (props) => {
    return (
        <div className='home-text-container'>
            <div className='home-text-title'>{props.title}</div>
            <div className='home-text-content'>{props.content}</div>
        </div>
    )
};
export default HomeText;
import './doctor-post-card.styles.scss'
const DoctorPostCard = ({postImg,description}) => {
    return (
        <div className="doctor-post-card">
            <div className="doctor-post-Img">
                <img src={require(`../../assets/post/${postImg}.png`)} alt="doctor-post-card-postImg" />
            </div>
            <div className="doctor-post-card__content">
                <p className="doctor-post-card__description">{description}</p>
            </div>
        </div>
    )
}
export default DoctorPostCard;
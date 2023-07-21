import './home-mobile-subText.styles.scss'

const HomeMobileSubText = ({title,content}) => {
  return (
    <div>
        <div className='home-mobile-subText-title'>
            {title}
        </div>
        <div className='home-mobile-subText-text'>
            {content}
        </div>
    </div>
  )
}

export default HomeMobileSubText
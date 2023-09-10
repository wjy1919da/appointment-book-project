import './sub-txt.styles.scss';

const SubTxt = ({ title, text }) => {
    return (
        <div className='sub-txt-container'>
            {title&&<div className='sub-txt-title'>
                {title}
            </div>} 
            {text && <div className='sub-txt-text'>
                {text}
            </div>}
        </div>
    )
}

export default SubTxt;
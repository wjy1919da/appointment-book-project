import './doctor-about-section.styles.scss';

const DoctorAboutSection = ({title, items}) => {
    const itemsGrid = items?.map((item) => 
        <div className='about-item-grid' key={item.title}>
            <img className='about-item-pic' src={item.content}></img>
            <p className='about-item-name'>{item.title}</p>
        </div>
    );

    return (
        <div className='about-container'>
            <p className='about-title'>{title}</p>
            <div className='about-items'>
                {itemsGrid}
            </div>
        </div>   
    )
}

export default DoctorAboutSection;
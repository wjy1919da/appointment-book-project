import { Link } from 'react-router-dom';
import './sub-procedure-form-v2-grid.styles.scss';
import IMG from '../../../assets/procedure/Breast_Augmentation.png';
//src/assets/procedure/Breast_Augmentation.png
const SubProcedureFormV2Grid = (props) => {
    console.log("subproceudureFormV2Grid",props);
    const gridItems = props.names.map((item, index) => {
        const title = Object.keys(item)[0];

        // Use item[title] directly as the URL for the image
        let imgSrc = item[title];

        // If title or imgSrc is empty, render an empty div
        if (!title || !imgSrc) {
            return <div className='sub-procedure-form-v2-grid-card' key={index}></div>;
        }

        return (
            <div className='sub-procedure-form-v2-grid-card' key={title}>
                <Link to={`/procedure/${title}`}>
                    <img src={IMG} className='sub-procedure-form-v2-grid-pic' alt={title} />
                </Link>
            </div>    
        )
    });

    return (
        <div className='sub-procedure-form-v2-grid-container'>
            {gridItems}
        </div>
    )
};
export default SubProcedureFormV2Grid;


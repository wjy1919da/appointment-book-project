import { Link, useParams } from 'react-router-dom';
import './sub-procedure-form-v2-grid.styles.scss';
const SubProcedureFormV2Grid = (props) => {
    const { name } = useParams();
    console.log("subproceudureFormV2Grid",props,name);
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
                {/* <Link to={`/procedure/${title}`}> */}
                    <img src={imgSrc} className='sub-procedure-form-v2-grid-pic' alt={title} />
                    <div className='sub-procedure-form-v2-grid-title'>{title}</div>
                {/* </Link> */}
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


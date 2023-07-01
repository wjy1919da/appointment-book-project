import { Link } from 'react-router-dom';
import './sub-procedure-form-v2-grid.styles.scss';
const SubProcedureFormV2Grid = (props) => {
    console.log("subproceudureFormV2Grid",props);
    const gridItems = props.names.map((item, index) => {
        const title = Object.keys(item)[0];

        // Check if item[title] exists before trying to call replace on it
        let name = item[title] ? item[title].replace(/[ -]/g, "_") : null;  // 修改这里

        // If title or name is empty, render an empty div
        if (!title || !name) {
            return <div className='sub-procedure-form-v2-grid-card' key={index}></div>;
        }

        return (
            <div className='sub-procedure-form-v2-grid-card' key={name}>
                <Link to={`/procedure/${name}`}>
                    <img src={require(`../../../assets/procedure/${name}.png`)} className='sub-procedure-form-v2-grid-pic' alt={name} />
                </Link>
                {/* <div className='sub-procedure-form-v2-grid-title'>{title}</div> */}
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


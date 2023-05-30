import { Link } from 'react-router-dom';
import './sub-procedure-form-v2-grid.styles.scss';
// error: container class 的位置加在了第一个return的div上，应该加在最外层的div上
const SubProcedureFormV2Grid = (props) => {
    const gridItems = props.names.map((item, index) => {
        const title = Object.keys(item)[0];
        const name = item[title];

        // If title is empty, render an empty div
        if (!title) {
            return <div className='sub-procedure-form-v2-grid-card' key={index}></div>;
        }

        return (
            <div className='sub-procedure-form-v2-grid-card' key={name}>
                <Link to={`/procedure/${name}`}>
                    <img src={require(`../../../assets/procedure/${name}.png`)} className='sub-procedure-form-v2-grid-pic' alt={name} />
                </Link>
                <div className='sub-procedure-form-v2-grid-title'>{title}</div>
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


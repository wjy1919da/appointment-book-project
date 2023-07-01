import { Link, useLocation } from 'react-router-dom';
import './procedure-menu-div.styles.scss';

const ProcedureMenuDiv = ({category, items, onHide}) => {
    const location = useLocation();  // 获取当前的路由 

    const itemsGird = items.map((item) => 
        <div className='col-4' key={item}>
            <Link 
                className='procedure-menu-div-item'
                to={`/procedure/${item.toLowerCase().replaceAll(' ', '_')}`} 
                onClick={onHide}>
                {item}
            </Link>
        </div>
    )

    return (
        <div className='procedure-menu-div'>
            <p className='procedure-menu-div-title'>
                {`${category} Procedures`}
            </p>
            <div className='container'>
                <div className='row'>
                    {itemsGird}
                    <div className='col-4 procedure-menu-div-item'>
                        <Link className='procedure-menu-div-more-link'>
                            View More...
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcedureMenuDiv;
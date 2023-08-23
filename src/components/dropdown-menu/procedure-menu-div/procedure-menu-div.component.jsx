import { Link, useLocation } from 'react-router-dom';
import './procedure-menu-div.styles.scss';
import { useMediaQuery } from 'react-responsive';
const ProcedureMenuDiv = ({category, items, onHide}) => {
    const isIpad = useMediaQuery({ query: `(min-width: 768px) and (max-width: 1023px)` });
    const location = useLocation();  
    const itemsGird = items.map((item) => 
        <div className={isIpad ? 'col-md-12' : 'col-lg-4'} key={item}>
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
                    <div className={isIpad ? 'col-md-12 procedure-menu-div-item' : 'col-lg-4 procedure-menu-div-item'}>
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
import { Link } from 'react-router-dom';
import './dropdown-menu.scss';

const DropdownMenu = () => {
    const facialProcedures = ['Facial Rejuvenation', 'Deep Plane Facelift', 'Eye Reshaping', 'Fox Eyes', 'Rhinoplasty', 'Lip Enhancement', 'Lip Augmentation', 'Otoplasty', 'Chin Implants', 'Neck Contouring', 'CO2 Laser Resurfacing']
    const breastProcedures = ['Breast Augmentation', 'Breast Lift', 'Breast Reconstruction', 'En Bloc Capsulectomy']
    const bodyProcedures = ['Liposuction', 'Butt Lift', 'Feminine Rejuvenation', 'Tummy Tuck', 'Arm Lift']
    const facialDropDownMenu = facialProcedures.map((procedure) => 
        <Link className='dropdown-item' to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} key={procedure}>
            <div className='dropdown-item-container'>
                <span>{procedure}</span>
            </div>
        </Link>
    );
    const breastDropDownMenu = breastProcedures.map((procedure) => 
        <Link className='dropdown-item' to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} key={procedure}>
            <div className='dropdown-item-container'>
                <span>{procedure}</span>
            </div>
        </Link>
    );
    const bodyDropDownMenu = bodyProcedures.map((procedure) => 
        <Link className='dropdown-item' to={'/procedure/' + procedure.toLowerCase().replaceAll(' ', '-')} key={procedure}>
            <div className='dropdown-item-container'>
                <span>{procedure}</span>
            </div>
        </Link>
    );

    return (
        <div className='container dropdown-menu-container'>
            <div className='row'>
                <div className='col-4'>
                    <Link className='dropdown-item dropdown-item-header' to='/procedure/facial'>Facial</Link>
                    {facialDropDownMenu}
                </div>
                <div className='col-4'>
                    <Link className='dropdown-item dropdown-item-header' to='/procedure/breast'>Breast</Link>
                    {breastDropDownMenu}
                </div>
                <div className='col-4'>
                    <Link className='dropdown-item dropdown-item-header' to='/procedure/body'>Body</Link>
                    {bodyDropDownMenu}
                </div>
            </div>
        </div>
    )
}

export default DropdownMenu;
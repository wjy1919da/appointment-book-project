import { Link, useLocation } from 'react-router-dom';
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import './dropdown-menu.scss';
import { Modal } from 'react-bootstrap';
import ProcedureMenuDiv from './procedure-menu-div/procedure-menu-div.component';
import ProcedureMenuSearch from './procedure-menu-search/procedure-menu-search.component';
import DoctorSearchMultiInput from '../doctor-search-multiInput/doctor-search-multiInput.component';
const capitalize = (str) => {
    return str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

const DropdownMenu = ({show, onHide}) => {
    const {data, isLoading, isError} = useGetProcedureCategories();
    const location = useLocation();  // 获取当前的路由

    const breastProcedures = ['Breast Augmentation', 'Breast Reduction', 'Fat Transfer', 'Breast Lift', 'Inverted Nipple Correction']
    const bodyProcedures = ['Non-Surgical Butt Lift', 'Liposuction', 'Arm Lift', 'Lipoma Removal', 'Brazilian Butt Lift']
    const faceProcedures = ['Facelift', 'Eyelid Lift', 'Ear Surgery', 'Necklift', 'Rhinoplasty Revision', 'Botox Injections']
    const skinProcedures = ['BOTOX Cosmetic', 'ZO Skincare', 'Microneedling', 'Dermal Fillers', 'Venus Legacy']

    return (
        <Modal
            dialogClassName='procedure-menu-modal'
            show={show}
            onHide={onHide}
            size='xl'
            >
                <ProcedureMenuSearch />
                <ProcedureMenuDiv category='Breast' items={breastProcedures} onHide={onHide}/>
                <ProcedureMenuDiv category='Body' items={bodyProcedures} onHide={onHide}/>
                <ProcedureMenuDiv category='Face' items={faceProcedures} onHide={onHide}/>
                <ProcedureMenuDiv category='Skin' items={skinProcedures} onHide={onHide}/>
                {/* {data && data.data.map((procedure, index) => {
                    const procedureUrl = '/procedure/' + procedure.categoryName.toLowerCase().replaceAll(' ', '-');
                    if (location.pathname === procedureUrl) {  // 检查当前的 procedure 是否匹配当前的 URL
                        // 如果匹配则返回 null，不创建链接
                        return null;
                    } else {
                        return (
                            <Link className='dropdown-item' to={procedureUrl} key={index}>
                                <div className='dropdown-item-container'>
                                    <span>{capitalize(procedure.categoryName.replace(/_/g, ' '))}</span>
                                </div>
                            </Link>
                        );
                    }
                })} */}
        </Modal>
        // <div className='container dropdown-menu-container'>
        //     <div className='row'>
        //         <div>
        //             <Link className='dropdown-item dropdown-item-header' to='/procedure/botox_injections'>Categories</Link>
        //             {data && data.data.map((procedure, index) => {
        //                 const procedureUrl = '/procedure/' + procedure.categoryName.toLowerCase().replaceAll(' ', '-');
        //                 if (location.pathname === procedureUrl) {  // 检查当前的 procedure 是否匹配当前的 URL
        //                     // 如果匹配则返回 null，不创建链接
        //                     return null;
        //                 } else {
        //                     return (
        //                         <Link className='dropdown-item' to={procedureUrl} key={index}>
        //                             <div className='dropdown-item-container'>
        //                                 <span>{capitalize(procedure.categoryName.replace(/_/g, ' '))}</span>
        //                             </div>
        //                         </Link>
        //                     );
        //                 }
        //             })}
        //         </div>
        //     </div>
        // </div>
    )
}


export default DropdownMenu;
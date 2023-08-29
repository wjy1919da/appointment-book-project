import { Link, useLocation } from 'react-router-dom';
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import './dropdown-menu.scss';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProcedureMenuDiv from './procedure-menu-div/procedure-menu-div.component';
import ProcedureMenuSearch from './procedure-menu-search/procedure-menu-search.component';
function groupByGroupName(data) {
    const grouped = {};

    data.forEach(item => {
        if (!grouped[item.groupName]) {
            grouped[item.groupName] = [];
        }
        grouped[item.groupName].push(item);
    });

    return Object.keys(grouped).map(key => ({
        groupName: key,
        items: grouped[key]
    }));
}
const DropdownMenu = ({show, onHide}) => {
    const {data,isLoading,error} = useGetProcedureCategories();
    const procedures = data ? groupByGroupName(data.data) : [];
    console.log("procedure menu data",procedures);
   
    //const procedures = data ? groupByGroupName(data.data) : [];
    //console.log("procedure menu data",procedures);
    //const navigate = useNavigate();
    //const setCategories = useProcedureQueryStore(state=>state.setCategories);
    //const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);

    // const breastProcedures = ['Breast Augmentation', 'Breast Reduction', 'Fat Transfer', 'Breast Lift', 'Inverted Nipple Correction']
    // const bodyProcedures = ['Non-Surgical Butt Lift', 'Liposuction', 'Arm Lift', 'Lipoma Removal', 'Brazilian Butt Lift']
    // const faceProcedures = ['Facelift', 'Eyelid Lift', 'Ear Surgery', 'Necklift', 'Botox Injections']
    // const skinProcedures = ['BOTOX Cosmetic', 'ZO Skincare', 'Microneedling', 'Dermal Fillers', 'Venus Legacy']

    return (
        <Modal
            dialogClassName='procedure-menu-modal'
            show={show}
            onHide={onHide}
            size='xl'
            >
                <div style={{padding: '15px'}}>
                    <ProcedureMenuSearch />
                    {procedures.map(procedure => <ProcedureMenuDiv 
                        category={procedure.groupName} 
                        items={procedure.items.map(item => item.categoryName)} 
                        onHide={onHide}/>)}
                </div>
        </Modal>
       
    )
}


export default DropdownMenu;
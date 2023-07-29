import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Link,useNavigate} from 'react-router-dom';
import './procesure-search-menu-mobile.styles.scss';
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
import useProcedureQueryStore from '../../procedureStore.ts'
import {useGetProcedureCategories} from '../../hooks/useGetProcedures';
const formatTitle = (title) => {
    title = title.replace(/_/g, ' ');
    return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}
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
const ProcedureSearchMenuMobile = ({show,onHide}) => {

    const {data,isLoading,error} = useGetProcedureCategories();
   
    const procedures = data ? groupByGroupName(data.data) : [];
    console.log("procedure menu data",procedures);
    const navigate = useNavigate();
    const setCategories = useProcedureQueryStore(state=>state.setCategories);
    const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);
    const handleSearchClick = () => {
        if (!procedureQuery.categories) {
            alert('Error: 输入不能为空!');
        } else {
            navigate(`/procedure/${procedureQuery.categories}`);
        }
    }
    return(
        <div className='procedure-search-menu-mobile-container'>
            <div>
             {procedures.map((group, index) => (
                    <div key={index} className='procedure-search-menu-mobile-category'>
                        <div className='procedure-category-title'>
                            <h4>{group.groupName}</h4>
                        </div>
                        <div className='procedure-category-text'>
                        <h6 
                          onClick={() => setCategories(group.items[0].categoryName)}
                          className="hoverable-title"
                        >{formatTitle(group.items[0].categoryName)}</h6>
                        {group.items[1] && (
                            <div className='procedure-category-subtext'>
                                <h6 
                                  onClick={() => setCategories(group.items[1].categoryName)}
                                  className="hoverable-title"
                                >{formatTitle(group.items[1].categoryName)}</h6>
                                <Link style={{ marginRight: '10px', textDecorationLine: 'underline' }}>View More...</Link>
                            </div>
                        )}
                        </div>
                    </div>
                ))}
            </div>
            <div >
                <button className='doctor-search-button'
                        style={{width:'90%',height:'45px',radius:'8px',marginTop:'5%',marginLeft:'5%'}}
                        onClick={handleSearchClick}
                    >
                    <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                     Search
                </button>
            </div>
        </div>
        
    )  
}
export default ProcedureSearchMenuMobile;
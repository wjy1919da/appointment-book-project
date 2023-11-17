import React from 'react'
import './procedure-search-dropdown.styles.scss'
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import useProcedureQueryStore from '../../procedureStore';
const formatTitle = (title) => {
    return title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
const ProcedureSearchDropDown = () => {
    // const {data,isLoading,error} = useGetProcedureCategories();
    // const procedures = data ? groupByGroupName(data.data) : [];
    // console.log(procedures);
    const procedureQuery = useProcedureQueryStore((state) => state.procedureQuery);
    const setProcedureSearchParam = useProcedureQueryStore((state) => state.setProcedureSearchParam);
    const trendyProcedures = [
        'botox_injections',
        'breast_augmentation',
        'chemical_peels',
        'fox_eyes'
    ];  
    console.log("procedureQuery",procedureQuery);  
    return (
        <div className='procedure-search-dropdown-container'>
            <div className='procedure-search-dropdown-title'>Trendy</div>
            <div className='procedure-search-dropdown-trendy'>
                <div className='procedure-search-dropdown-trendy-items'>
                    {trendyProcedures.map((procedure, index) => (
                        <div key={index} className="procedure-item" onClick={()=>setProcedureSearchParam(procedure)}>
                            {formatTitle(procedure)}
                        </div>
                    ))}
                </div>
            </div>
            <div className='procedure-search-dropdown-previous'>
                 <div className='procedure-search-dropdown-title-previous'>Previous Search</div>
            </div>
        </div>
  )
}

export default ProcedureSearchDropDown
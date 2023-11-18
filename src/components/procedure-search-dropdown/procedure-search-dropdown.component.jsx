import React from 'react'
import './procedure-search-dropdown.styles.scss'
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import useProcedureQueryStore from '../../procedureStore';
const formatInputForFilter = (input) => {
    return input.toLowerCase().replace(/\s+/g, '_');
};

const formatTitle = (title) => {
    return title.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
const ProcedureSearchDropDown = () => {
    const procedureQuery = useProcedureQueryStore((state) => state.procedureQuery);
    const setProcedureSearchParam = useProcedureQueryStore((state) => state.setProcedureSearchParam);
    const trendyProcedures = [
        'botox_injections',
        'breast_augmentation',
        'chemical_peels',
        'fox_eyes'
    ];  
    const historyProcedures = JSON.parse(localStorage.getItem('searchHistory'));
    const formattedInput = formatInputForFilter(procedureQuery.procedureSearchParam);
    const filteredHistoryProcedures = historyProcedures?.filter(procedure =>
        procedure.toLowerCase().includes(formattedInput)
    ).slice(0, 5);
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
            <div className='procedure-search-dropdown-previous-container'>
                <div className='procedure-search-dropdown-title-previous'>Previous Search</div>
                {filteredHistoryProcedures.map((history, index) => (
                    <div key={index} className='procedure-search-item-previous' onClick={() => setProcedureSearchParam(history)}>
                      {formatTitle(history)}
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ProcedureSearchDropDown
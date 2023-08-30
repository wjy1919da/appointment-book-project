import { InputGroup } from '@chakra-ui/react'
import './procedure-menu-search.styles.scss';
import FormInput from '../../form-input/form-input.component';
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
import HomeButton from '../../home-button/home-button.component';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProcedureQueryStore from '../../../procedureStore.ts';

const ProcedureMenuSearch = () => {
    const [internalProcedure,setInternalProcedure] = useState('');
    const navigate = useNavigate();
    const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);
    const handleOnClick = () => {
        if (!internalProcedure) {
            alert('Error: input can not be empty!');
        } else {
            //setInternalProcedure(internalProcedure.replace(/ /g, '_'));
            let cleanProcedure = internalProcedure.replace(/ /g, '_');
            navigate(`/procedure/${cleanProcedure}`);
        }
    }
    return (
        <div className='procedure-menu-search'>
            <InputGroup display="flex" alignItems="center">
            <input 
                placeholder='Facial, Botox Injection, Bre...'
                className='procedure-menu-input' 
                onChange={(event)=>setInternalProcedure(event.target.value)}
            />
            <HomeButton title='search' onClick = {handleOnClick} isIcon = {SearchIcon} height='40px' width='150px'/>
            </InputGroup>
        </div>
    )
}

export default ProcedureMenuSearch;
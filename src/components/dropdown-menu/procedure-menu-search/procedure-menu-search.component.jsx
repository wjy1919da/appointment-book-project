import { InputGroup } from '@chakra-ui/react'
import './procedure-menu-search.styles.scss';
import FormInput from '../../form-input/form-input.component';
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
import HomeButton from '../../home-button/home-button.component';

const ProcedureMenuSearch = () => {
    return (
        <div className='procedure-menu-search'>
            <InputGroup display="flex" alignItems="center">
            <input 
                placeholder='Facial, Botox Injection, Bre...'
                className='procedure-menu-input' />
            {/* <button className='search-button'>
                <img src={SearchIcon} className='search-icon' alt='search'/>
                search
            </button> */}
            <HomeButton title='search' isIcon = {SearchIcon} height='40px' width='150px'/>
            </InputGroup>
        </div>
    )
}

export default ProcedureMenuSearch;
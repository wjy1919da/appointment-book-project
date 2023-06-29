import { Link, useLocation } from 'react-router-dom';
import { useGetProcedureCategories } from '../../hooks/useGetProcedures';
import './dropdown-menu.scss';
const capitalize = (str) => {
    return str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

const DropdownMenu = () => {
    const {data, isLoading, isError} = useGetProcedureCategories();
    const location = useLocation();  // 获取当前的路由

    return (
        <div className='container dropdown-menu-container'>
            <div className='row'>
                <div>
                    <Link className='dropdown-item dropdown-item-header' to='/procedure/botox_injections'>Categories</Link>
                    {data && data.data.map((procedure, index) => {
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
                    })}
                </div>
            </div>
        </div>
    )
}


export default DropdownMenu;
import './sub-procedure-form-v2.styles.scss'
import SubProcedureFormV2Grid from './sub-procedure-form-v2-grid/sub-procedure-form-v2-grid.component';
import { useMediaQuery } from 'react-responsive';
const SubProcedureFormV2 = (props) => {
    const isIpad = useMediaQuery({ query: `(min-width: 768px) and (max-width: 1023px)` });
    const alternativeTreatmentForm = props.data.alternativeTreatmentForm;

    const headerObj = alternativeTreatmentForm.find(item => item.header);
    const bodyObj = alternativeTreatmentForm.find(item => item.body);
    const header = headerObj ? headerObj.header : [];
    const body = bodyObj ? bodyObj.body : [];
    
    const tdStyle = isIpad 
        ? { width: '20%', textAlign: 'center', verticalAlign: 'middle', border: 'none' }
        : { width: '25%', height: '60px', textAlign: 'left', verticalAlign: 'middle', border: 'none' };

    return (
        <div>
            <SubProcedureFormV2Grid names={header} />
            <table className="table table-striped sub-procedure-table-v2">
                <tbody>
                    {body.map((item, index) => (
                        <tr key={index}>
                            <td className='form-v2-none' style={tdStyle}>{item.name}</td>
                            {item.value.map((val, idx) => (
                                <td key={idx} style={tdStyle}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default SubProcedureFormV2;
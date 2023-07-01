import './sub-procedure-form-v2.styles.scss'
import SubProcedureFormV2Grid from './sub-procedure-form-v2-grid/sub-procedure-form-v2-grid.component';
const SubProcedureFormV2 = (props) => {
    console.log("subproceudureForm",props);
    const alternativeTreatmentForm = props.data.alternativeTreatmentForm;
    
    const headerObj = alternativeTreatmentForm.find(item => item.header);
    const bodyObj = alternativeTreatmentForm.find(item => item.body);

    const header = headerObj ? headerObj.header : [];
    const body = bodyObj ? bodyObj.body : [];
    console.log("header",header);
    console.log("body",body);
    return (
        <div>
            <SubProcedureFormV2Grid names={header} />
            <table className="table table-striped" style={{ width: '800px', height: '60px' }}>
                <tbody>
                    {body.map((item, index) => (
                        <tr key={index}>
                            <td style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle', border: 'none' }}>{item.name}</td>
                            {item.value.map((val, idx) => (
                                <td key={idx} style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle', border: 'none' }}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default SubProcedureFormV2;
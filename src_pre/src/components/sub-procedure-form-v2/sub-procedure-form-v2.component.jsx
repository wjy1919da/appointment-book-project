import './sub-procedure-form-v2.styles.scss'
import SubProcedureFormV2Grid from './sub-procedure-form-v2-grid/sub-procedure-form-v2-grid.component';
const SubProcedureFormV2 = (props) => {
    // const header = [
    //     {},
    //     { "Facial Rejuvenation": "lip-augmentation" },
    //     { "Facelift": "lip-augmentation" },
    //     { "Botox Injection": "lip-augmentation" }
    // ];
    // const body = [
    //     {
    //         "name": "Lorem ipsum dolor sit amet consectetur",
    //         "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    //     },
    //     {
    //         "name": "Lorem ipsum dolor sit amet consectetur",
    //         "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    //     },
    //     {
    //         "name": "Lorem ipsum dolor sit amet consectetur",
    //         "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    //     },
    //     {
    //         "name": "Lorem ipsum dolor sit amet consectetur",
    //         "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
    //     }
    // ];
    const headerObj = props.data.find(item => item.header);
    const bodyObj = props.data.find(item => item.body);
    
    const header = headerObj ? headerObj.header : [];
    const body = bodyObj ? bodyObj.body : [];
    return (
        <div>
            <SubProcedureFormV2Grid names={header} />
            <table className="table table-striped" style={{ width: '800px', height: '60px' }}>
                <tbody>
                    {body.map((item, index) => (
                        <tr key={index}>
                            <td style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle' }}>{item.name}</td>
                            {item.value.map((val, idx) => (
                                <td key={idx} style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle' }}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default SubProcedureFormV2;
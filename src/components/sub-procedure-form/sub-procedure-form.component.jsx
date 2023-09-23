import './sub-procedure-form.styles.scss'
 
const SubProcedureForm = (props) => {
    const optionsForm = props.data.optionsForm;
    
    const headerObj = optionsForm.find(item => item.header);
    const bodyObj = optionsForm.find(item => item.body);
    const header = headerObj ? headerObj.header : [];
    const body = bodyObj ? bodyObj.body : [];
    return (
        <div className='sub-procedure-form'>
            <table className="table table-striped sub-procedure-form-table">
                <thead>
                    <tr>
                        {header.map((item, index) => (
                            <th 
                                key={index} 
                                style={{ 
                                    width: '25%', 
                                    maxWidth: '110px', // 这里修正了语法错误
                                    height: '60px', 
                                    textAlign: 'center', 
                                    verticalAlign: 'middle', 
                                    border: 'none' 
                                }}
                            >
                                {item.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {body.map((item, index) => (
                        <tr key={index}>
                            <td style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle', border: 'none' }}>
                                {item.name}
                            </td>
                            {item.value.map((value, valueIndex) => (
                                <td key={valueIndex} style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle', border: 'none' }}>
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
   
}
export default SubProcedureForm;
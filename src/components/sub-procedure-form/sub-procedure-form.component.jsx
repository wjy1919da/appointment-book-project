import './sub-procedure-form.styles.scss'
 //const { data } = props;
  //console.log("data in sub procedure-form", data);
//   const header = [{}, {
// 		"name": "Option 1"
// 	}, {
// 		"name": "Option 2"
// 	}, {
// 		"name": "Option 3"
// 	}];
//   const body = [{
//     "name": "Lorem ipsum dolor sit amet consectetur",
//     "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
//   },
//   {
//     "name": "Lorem ipsum dolor sit amet consectetur",
//     "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
//   },
//   {
//     "name": "Lorem ipsum dolor sit amet consectetur",
//     "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
//   },
//   {
//     "name": "Lorem ipsum dolor sit amet consectetur",
//     "value": ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]
//   }
//  ];
const SubProcedureForm = (props) => {   
    console.log("props in sub procedure-form", props.data);
    const optionsForm = props.data.optionsForm;
    
    const headerObj = optionsForm.find(item => item.header);
    const bodyObj = optionsForm.find(item => item.body);

    const header = headerObj ? headerObj.header : [];
    const body = bodyObj ? bodyObj.body : [];
 return (
  <div className='sub-procedure-form'>
      <table className="table table-striped" style={{ width: '800px', height: '60px' }}>
          <thead>
              <tr>
                  {header.map((item, index) => (
                      <th key={index} style={{ width: '25%', height: '60px', textAlign: 'center', verticalAlign: 'middle', border: 'none' }}>
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
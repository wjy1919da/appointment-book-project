import { Link } from "react-router-dom";

const SubProcedureReference = (props) => {
    const { reference } = props;
    const referenceList = reference.map((ref, index) => { 
        return(
            <li key={index}>
                <Link className = 'sub-procedure-reference' to={ref} >{ref}</Link>
            </li>
        );
    });

    return (
        <div>
            <ul>
               {referenceList}
            </ul>
        </div>
    );   
};

export default SubProcedureReference;

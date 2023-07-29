import { Link } from "react-router-dom";
import './sub-procedure-reference.styles.scss';

const SubProcedureReference = (props) => {
    const { reference } = props;
    const referenceList = reference.map((ref, index) => { 
        return(
            <li key={index} className="sub-procedure-reference">
                <Link className = 'sub-procedure-reference-inner' to={ref} >●&nbsp;&nbsp;{ref}</Link>
            </li>
        );
    });

    return (
        <div>
            <ul className="sub-procedure-reference-ul">
               {referenceList}
            </ul>
        </div>
    );   
};

export default SubProcedureReference;

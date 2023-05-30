import './sub-procedure-scroll-card.styles.scss'
import facialBefore1 from '../../../assets/procedure/facial_injection_before_group1.png';
import facialAfter1 from '../../../assets/procedure/facial_injection_after_group1.png';
const SubProcedureScrollCard = (props) => {
    return(
        <div className='sub-procedure-card-container'>
           <div className='sub-procedure-card'>
                <div className='sub-procedure-card-pic'>
                  <img src={require(`../../../assets/procedure/${props.before}`)} alt="before" />
                </div>
                <div className='sub-procedure-card-title'>
                    Before
                </div>
           </div>
           <div className='sub-procedure-card'>
                <div className='sub-procedure-card-pic'>
                    <img src={require(`../../../assets/procedure/${props.after}`)} alt="after" />
                </div>
                <div className='sub-procedure-card-title'>
                     After
                </div>
            </div>    
        </div>
        
    ) 
};
export default SubProcedureScrollCard;
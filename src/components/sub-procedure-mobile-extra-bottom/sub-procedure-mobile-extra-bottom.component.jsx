import SubProcedureMobileExtraImage from '../../assets/procedure/sub-procedure-mobile-extra-pic.png';
import HomeLink from '../home-link/home-link.component';
import './sub-procedure-mobile-extra-bottom.styles.scss';

const SubProcedureMobileExtraBottom = () => {
    return(
        <div className = 'sub-procedure-mobile-extra-bottom-container'>
            <div className = 'sub-procedure-mobile-extra-bottom-image-section'>
                <img className = 'sub-procedure-mobile-extra-bottom-image' src = {SubProcedureMobileExtraImage} alt = 'Sub Procedure Mobile Extra Image'/> 
            </div>

            <div className = 'sub-procedure-mobile-extra-bottom-text-section'>
                <div className = 'sub-procedure-mobile-extra-bottom-text-title'>
                   <span className = 'sub-procedure-mobile-extra-bottom-text1'> Still have a questions? Ask a doctor </span>
                </div>

                <div className = 'sub-procedure-mobile-extra-bottom-text-content'>
                    <span className = 'sub-procedure-mobile-extra-bottom-text2'>
                        Our platform collaborates with top professionals and institutions to provide 
                        you with expert advice and support. 
                        Consult with our trusted partners about surgery procedures, 
                        coupons, and more.
                    </span>
                </div>
            </div>

            <div className = 'sub-procedure-mobile-extra-bottom-link-button-section'>
                <HomeLink 
                    title= "View All Doctors" 
                    href = "/doctor"
                />    
            </div>
        </div>
    )
}
export default SubProcedureMobileExtraBottom;
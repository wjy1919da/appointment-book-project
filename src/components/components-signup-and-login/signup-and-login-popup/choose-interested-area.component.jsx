import ProcedureIconGrid from '../instrument-icon-grid/instrument-icon-grid.component';
import './choose-interested.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import NextButton from './next-button.component';
import CreateAccount from './create-account.component';
import React, { useState, useEffect } from 'react';

const ChooseInterestedArea = () => {
  const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
  const setInterested = userInfoQueryStore(state=>state.setInterested);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  console.log("userInfo in interested page",userInfo);
  const procedures = ['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening','fox_eyes','laser_hair_removal'];
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  useEffect(() => {
    getRandomProcedures();
  }, []);
  const getRandomProcedures = () => {
    setInterested(null);
    const shuffled = procedures.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    setSelectedProcedures(selected);
  }

  const handleSkip = ()=>{
    setInterested(null);
    switchPopupTab('success');
  }

  return (
    <div className="choose-interested-outer-container">
        <div>
           <LoginRegisterTitle title="Your Interests" handleBackwards={()=>switchPopupTab("gender")} handleSkip={handleSkip} /> 
        </div>
        <div className='choose-interested-refresh'>
            <CreateAccount title="Do not like these?" subTitle="Refresh!" onClick={getRandomProcedures} icon='true'/>
        </div>
        <div>
            <ProcedureIconGrid names={selectedProcedures}/> 
        </div>        
        <div className="choose-interested-button-section">
            <NextButton type="submit" title='Next' width='180px' onClick={()=>switchPopupTab("success")}/>
        </div>
    </div>
  )
}

export default ChooseInterestedArea
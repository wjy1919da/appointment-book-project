import React from 'react'
import './procedure-card.styles.scss'
const ProcedureCard = ({cardInfo}) => {
  return (
    <div className='procedure-card-container'>
        <div className="procedure-card-text">
            <span style={{color:"#A5A6A8"}}>Cost:</span>
            <span style={{color:"#000000"}}>{cardInfo.Cost}</span>
        </div>
        <div className="procedure-card-text">
            <span style={{color:"#A5A6A8"}}>Duration:</span>
            <span style={{color:"#000000"}}>{cardInfo.Duration}</span>
        </div>
        <div className="procedure-card-text">
            <span style={{color:"#A5A6A8"}}>Safety:</span>
            <span style={{color:"#000000"}}>{cardInfo.Safety}</span>
        </div>
        <div className="procedure-card-text">
            <span style={{color:"#A5A6A8"}}>Satisfication Rate:</span>
            <div>
                <span className={`stars-container stars`}>★★★★★</span>
            </div>
        </div>
        <div className="procedure-card-text">
            <span style={{color:"#A5A6A8"}}>Pain:</span>
            <span style={{color:"#000000"}}>{cardInfo.Pain}</span>
        </div>  
    </div>
  )
}

export default ProcedureCard
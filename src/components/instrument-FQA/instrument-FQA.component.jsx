import React, { useState } from 'react';
import './instrument-FQA.styles.scss';
import HomeSpinner from '../home-spinner/home-spinner.component';
const InstrumentFAQ = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const toggleCollapsible = (index) => {
    setActiveIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };
  const data = {
    data: [
      {
        title: "What is the function of the instrument?",
        content: "The instrument measures the frequency of the sound waves and provides accurate data about the pitch of the note being played."
      },
      {
        title: "How to maintain the instrument?",
        content: "Regular cleaning and proper storage are essential. Avoid exposing the instrument to extreme temperatures or humidity."
      },
      {
        title: "Where can I buy replacement parts?",
        content: "Replacement parts can be purchased from our official website or from authorized dealers."
      },
      {
        title: "What is the warranty period?",
        content: "The instrument comes with a one-year warranty, covering manufacturing defects."
      },
    ]
  };
  
  return (
    <div className='Collapsible-list'>
      <>
        <h2 className="FAQ-title">FAQ</h2>
        <table className="collapsible-list table">
            <tbody>
            {data.data.map((item, index) => (
                item.content && 
                <tr key={index}>
                    <th>
                        <button
                            className={`collapsible ${activeIndexes.includes(index) ? 'active' : ''}`}
                            onClick={() => toggleCollapsible(index)}
                        >
                           <li>{item.title}</li>
                        </button>
                        <div
                            className="content"
                            style={{
                                maxHeight: activeIndexes.includes(index) ? '1000px' : '0',
                                transition: 'max-height 0.3s ease',
                                overflow: 'hidden',
                            }}
                        >
                            <p>{item.content}</p>
                        </div>
                    </th>
                </tr>
            ))}
            </tbody>
        </table>
      </>
  </div>
  )
}

export default InstrumentFAQ
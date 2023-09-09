import HomeLink from '../../home-link/home-link.component';
import DropdownMenu from '../../../dropdown-menu/dropdown-menu';
import './home-instrument-popUp.styles.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
const HomeInstrumentPopUP = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [IsModalOpen, setIsModelOpen] = useState(false);
 
    return (
      <div>
        <Modal
            dialogClassName='instrument-popUp-modal'
            show={props.show} 
            onHide={props.onClose} 
            size='lg'
            aria-labelledby="example-custom-modal-styling-title"
            style={{ marginTop: '100px' }}
        >
            <div className="instrument-popUp-container">
                {props.instrument.logo && 
                    <div className={`instrument-logo-${props.instrument.hasProcedure ? 'with-procedure' : 'without-procedure'}`}>
                        <img src = {props.instrument.logo} ></img>
                    </div>
                }
                {props.instrument.title && 
                <div className={`instrument-popUp-title ${props.instrument.name.toLowerCase() === 'thermage' ? 'thermage-title' : ''}`}>
                    <span>{props.instrument.title}</span>
                </div>
                }
                {props.instrument.text &&
                    <div className='instrument-popUp-text'>
                        <span style={{width:'491px'}}>{props.instrument.text}</span>
                    </div>
                }
                {props.instrument.subtext&&
                    <div className='instrument-popUp-subtext'>
                         <span>{props.instrument.subtext}</span>
                    </div>
                }
                {props.instrument.procedure &&
                    <div className='instrument-popUp-procedure'>
                        <img src = {props.instrument.procedure} ></img>
                    </div>
                }
                <div className='instrument-popUp-clickMore'>
                    <Link >
                        Click to learn more
                    </Link>
                </div>

            </div>
        </Modal>
      </div>
    );
  };
  
export default HomeInstrumentPopUP;
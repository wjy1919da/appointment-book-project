import './contact-us.scss';
import { useState, useLayoutEffect } from 'react';
import { ContactSubmission } from '../../hooks/useContactForm';
import companyLogo from '../../assets/home/logo.png';
import Footer from '../../components/footer/footer.component';
import { Link } from 'react-router-dom';
import Instagram from '../../assets/home/instagram.svg';
import TikTok from '../../assets/home/tiktok.svg';
import Facebook from '../../assets/home/facebook.svg';
import Linkedin from '../../assets/home/linkedin.svg';

const ContactUs = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [name, setName] = useState("");  // for holding the entered name
    const [email, setEmail] = useState("");  // for holding the entered email
    const [message, setMessage] = useState("");  // for holding the entered message
    const [nameError, setNameError] = useState(false);  // if they do not input anything into name field
    const [emailError, setEmailError] = useState(false);  // if they do not input anything into email field
    const [messageError, setMessageError] = useState(false);  // if they do not enter anything into message field
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [submitted]);
    const mailingAddress = '9100 Wilshire Blvd, Beverly Hills, CA 90212';
    const companyEmail = 'marketing@charm-life.com';

    const handleSubmit = async () => {
        setNameError(false);
        setEmailError(false);
        setMessageError(false);
        if (!name || !email || !message) {
            if (!name) {  
                setNameError(true);
            }
            if (!email) {  
                setEmailError(true);
            }
            if (!message) { 
                setMessageError(true);
            } 
            return;
        }
        const userSubmission = {
            'name': name,
            'email_address': email,
            'message': message
        };
        setIsLoading(true);
        try {
            await ContactSubmission(userSubmission);  // API call
        } catch (error) {
            setError(error);
        } finally {
            setSubmitted(true);
            setIsLoading(false);
        }
    }

    return (
        <div className='contact-us'>
            <div className='contact-us-container gradient-background'>
                <div className='contact-us-orange-rounded-column'></div>
                <div className='contact-upper-text-container'>
                    <div className='contact-title-container'>
                        <h2 className='contact-title'>Contact Us</h2>
                    </div>
                    <div className='contact-subtitle-container'>
                        <h4 className='contact-subtitle'>Fill out the form below for any inquiries or comments you may have. We look forward to hearing from you!</h4>
                    </div>
                </div>
                <div className='contact-large-modal-container'>
                    {submitted ? (  // form has been submitted
                        <div className='contact-submitted-modal'>
                            <h1 className='contact-submitted-title'>Thank You!</h1>
                            <h4 className='contact-submitted-subtext'>Your form has been successfully submitted. Please wait 2-3 business days for a response.</h4>
                            <div className='contact-submitted-img-container'>
                                <img src={companyLogo} alt='company logo' className='contact-submitted-img' />
                            </div>
                            <Link to="/">
                                <button className='contact-submitted-button' type='button'>Back to Home Page</button>
                            </Link>
                        </div>
                    ):(  // form hasn't been submitted
                        <div className='contact-form-modal-container'>
                            <div className='contact-form-half-column contact-form-company-info'>
                                <div className='contact-form-mailing-address-container'>
                                    <div className='mailing-address-title-container'>
                                        <h3 className='mailing-address-title contact-form-title'>Our mailing address:</h3>
                                    </div>
                                    <div className='mailing-address-info-container'>
                                        <p className='mailing-address-info contact-form-text'>{mailingAddress}</p>
                                    </div>
                                </div>
                                <div className='contact-form-email-addres-container'>
                                    <div className='email-address-title-container'>
                                        <h3 className='email-address-title contact-form-title'>Email:</h3>
                                    </div>
                                    <div className='email-address-info-containter'>
                                        <p className='email-address-info contact-form-text'>{companyEmail}</p>
                                    </div>
                                </div>
                                <div className='contact-social-media-icon-container'>
                                    <SocialIcons />
                                </div>
                            </div>
                            <div className='contact-form-half-column contact-form-user-info'>
                                <div className='contact-form-container'>
                                    <form className='contact-form'>
                                        <label htmlFor="personal-info" className='personal-info-label contact-form-label'>Personal Information</label>
                                        <input placeholder='Name *'
                                            required
                                            id='personal-info'
                                            onChange={(event) => setName(event.target.value)}
                                            onBlur={() => { if (nameError && name) setNameError(false)}} // if previously there was an error, and now we have input some text, remove the red border 
                                            value={name}
                                            className={`user-name-input contact-form-input ${nameError && 'input-error'}`} />
                                        <input placeholder='Email *'
                                            required
                                            onChange={(event) => setEmail(event.target.value)}
                                            onBlur={() => { if (emailError && email) setEmailError(false)}}
                                            value={email}
                                            className={`user-email-input contact-form-input ${emailError && 'input-error'}`} />
                                        <label htmlFor="contact-form-message" className='contact-message-label contact-form-label'>Message</label>
                                        <textarea placeholder='Enter your message *'
                                            id='contact-form-message'
                                            required
                                            onChange={(event) => setMessage(event.target.value)}
                                            onBlur={() => {if (messageError && message) setMessageError(false)}}
                                            value={message}
                                            rows={8}
                                            className={`contact-form-message contact-form-input ${messageError && 'input-error'}`} />
                                        <button type='button' disabled={isLoading} className={`contact-form-submit-button ${isLoading && 'contact-form-submit-button-loading'}`} onClick={() => handleSubmit()} >{isLoading ? 'Loading' : 'Submit'}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

const SocialIcons = () => {
    return (
        <div className='contact-social-media-icons'>
            <a className='contact-social-media-link' href='https://www.facebook.com/profile.php?id=100063997782773&mibextid=LQQJ4d' target='_blank' rel='noreferrer'>
                <img className='contact-social-media-icon' src={Facebook} alt='facebook' />
            </a>
            <a className='contact-social-media-link' href='https://www.linkedin.com/company/charm-life' target='_blank' rel='noreferrer'>
                <img className='contact-social-media-icon' src={Linkedin} alt='linkedin' />
            </a>
            <a className='contact-social-media-link' href='https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1' target='_blank' rel='noreferrer'>
                <img className='contact-social-media-icon' src={TikTok} alt='tiktok' />
            </a>
            <a className='contact-social-media-link' href='https://www.instagram.com/charm_life_official/?igshid=YmMyMTA2M2Y%3D' target='_blank' rel='noreferrer'>
                <img className='contact-social-media-icon' src={Instagram} alt='instagram' />
            </a>
        </div>
    )
}

export default ContactUs;
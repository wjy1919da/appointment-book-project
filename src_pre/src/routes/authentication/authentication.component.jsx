import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './authentication.styles.scss';

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <div className='row'>
                <div className='col-12 col-lg-6'>
                    <SignInForm />
                </div>
                <div className='col-12 col-lg-6'>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

export default Authentication;

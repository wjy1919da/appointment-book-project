import { Auth } from 'aws-amplify';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';


const defaultFormContent = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
}

const SignUpForm = () => {
    const [formContent, setFormContent] = useState(defaultFormContent);
    const { username, email, password, confirmPassword, verificationCode } = formContent;

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setFormContent({ ...formContent, [name]: value });
    }

    const resetFormContent = () => {
        setFormContent(defaultFormContent);
    }

    const handleSendVerificationCodeSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                },
                autoSignIn: {
                    enabled: true,
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up: ', error);
        }
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

        try {
            await Auth.confirmSignUp(username, verificationCode);
            resetFormContent();
        } catch (error) {
            console.log('error confirming sign up: ', error);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <h6>Sign up with your email and password</h6>
            <form onSubmit={handleSendVerificationCodeSubmit}>
                <FormInput
                    label='Username'
                    type='text'
                    required
                    onChange={handleContentChange}
                    name='username'
                    value={username}
                />
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleContentChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleContentChange}
                    name='password'
                    value={password}
                />
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleContentChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <div className='sign-up-btn-container'>
                    <button className='sign-up-btn' type='submit' >Send Verification Code</button>
                </div>
            </form>
            <form onSubmit={handleSignUpSubmit}>
                <FormInput
                    label='Verification Code'
                    type='text'
                    required
                    onChange={handleContentChange}
                    name='verificationCode'
                    value={verificationCode}
                />
                <div className='sign-up-btn-container'>
                    <button className='sign-up-btn' type='submit' >Sign up</button>
                </div>
            </form>

        </div>
    )
}

export default SignUpForm;
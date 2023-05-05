import { Auth } from 'aws-amplify';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormContent = {
    username: '',
    password: ''
}

const SignInForm = () => {
    const [formContent, setFormContent] = useState(defaultFormContent);
    const { username, password } = formContent;

    const handleContentChange = (event) => {
        const { name, value } = event.target;
        setFormContent({ ...formContent, [name]: value });
    }

    const handleSignInSubmit = async (event) => {
        event.preventDefault();

        try {
            // const user = await Auth.signIn(username, password);
            // todo 完善api
            const user = {

            }
            console.log('sign in successfully')
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <h6>Sign in with your email and password</h6>
            <form onSubmit={handleSignInSubmit}>
                <FormInput
                    label='Username'
                    type='text'
                    required
                    onChange={handleContentChange}
                    name='username'
                    value={username}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleContentChange}
                    name='password'
                    value={password}
                />
                <div className='sign-in-btn-container'>
                    <button className='sign-in-btn' type='submit'>Sign in</button>
                </div>
                <div className='sign-in-buttons-container'>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;

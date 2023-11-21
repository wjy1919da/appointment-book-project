import React from 'react';

// components
import PinkBackground from '../account-setting-background/account-setting-background';
import Button from '../../components-posts/community-post-button/community-post-button';
import AccountSettingSubMenu from '../account-setting-sub-menu/account-setting-sub-menu';

// scss
import './account-security-questions.scss';
import BackButton from '../account-setting-back-button/account-setting-back-button';

const SecurityQuestions = () => {
  return (
    <div className='account-setting-security-questions-container'>
      <PinkBackground />
      <AccountSettingSubMenu />
      <BackButton backButtonName='Account Setting' />
      <div className='account-setting-security-questions-right-container'>
        <Button
          buttonName='Save Changes'
          className='account-setting-security-questionsbutton'
        />
        <form className='account-setting-security-questions-form'>
          <h2 className='account-setting-security-questions-title'>Security Questions</h2>

          <label
            htmlFor='linked-password'
            className='account-setting-security-questions-label'
          >
            Question 1
          </label>

          <div className='account-setting-security-questions-select'>
            <select id='question-1' name='question-1'>
              <option value='' disabled selected>
                In what city did you meet your first spouse/parter?
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>

          <input
            type='text'
            id='linked-password'
            placeholder='Enter something.'
            className='account-setting-security-questions-input'
          />

          <label
            htmlFor='linked-new-password'
            className='account-setting-security-questions-label'
          >
            Question 2
          </label>

          <div className='account-setting-security-questions-select'>
            <select id='question-2' name='question-2'>
              <option value='' disabled selected>
                What is your mother's middle name?
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>

          <input
            type='text'
            id='linked-new-password'
            placeholder='Enter something.'
            className='account-setting-security-questions-input'
          />

          <label
            htmlFor='linked-new-password-2'
            className='account-setting-security-questions-label'
          >
            Question 3
          </label>

          <div className='account-setting-security-questions-select'>
            <select id='question-3' name='question-3'>
              <option value='' disabled selected>
                What is your oldest sibling's middle name?
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>

          <input
            type='text'
            id='linked-new-password-2'
            placeholder='Enter something.'
            className='account-setting-security-questions-input'
          />
        </form>
      </div>
    </div>
  );
};

export default SecurityQuestions;

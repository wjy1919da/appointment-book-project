import axios from "axios";
import APIClient from "../../services/api-client.js";

export function onBlurCheck(stateVariable, setStateVariableError, checkerFunc) {
    if (stateVariable === null || stateVariable === "") {
        setStateVariableError(false);
        return;
    }
    setStateVariableError(!checkerFunc(stateVariable));
}

export function isValidEmail(input) {
    // 简单的正则表达式，用于验证电子邮件
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
};

export function isValidDate(input) {
    // your desired pattern
    const pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/;
    const match = input.match(pattern);
    if (!match) return false;
    const date = new Date(input);
    // Now let's ensure that the date is not out of index

    if (date.getMonth()+1 === parseInt(match[1], 10) && date.getDate() === parseInt(match[2], 10)) {
        return true;
    }
    return false;
}

export function isValidPassword(input) {
    const pattern = /^(?=.*\d)(?=.*[A-Za-z]|[!@#¥%^&*()_+=-~`])[A-Za-z\d!@#¥%^&*()_+=-~`]{6,18}$/;
    return input.match(pattern);
}

export function isValidPhoneNumber(input) {
    const pattern = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-?[0-9]{4}$/;
    return input.match(pattern);
}

export async function getProcedures() {
    const body = {
        pageReq: 0
    };
    try {
        const res1 = await axios.post('https://api-dev.charm-life.com/doctor/search/procedure', body);
        if (!res1?.data?.code === 100) throw new Error();
        const procedures = res1?.data?.data;
        const locationsDict = {};
        const proceduresArray = [];
        for (let i = 0; i < procedures.length; i++) {
            const procedure = procedures[i];
            const location = procedure.groupName.split(' ')[0].toLowerCase();
            if (!locationsDict[location]) {  // if we haven't seen the current location
                locationsDict[location] = 1;  // mark that we've seen the location
                proceduresArray.push({ 'location': location, 'procedures': [procedure.categoryName]}); // create a new location object, and start the array with the current procedure
            } else {  // else if we've seen this location before
                for (let j = 0; j < proceduresArray.length; j++) { // cycle through the array
                    if (proceduresArray[j].location === location) {  // when we found the correct location object
                        proceduresArray[j].procedures.push(procedure.categoryName);  // add the current procedure to the list
                    }
                }
            }
        }
        return proceduresArray;
    } catch (err) {
        throw new Error('Unable to retrieve procedure data for interests selection on edit profile');
    }   
}

// used for determining if an email provided has already been verified or not. i.e. prevents a user from changing their email to an email already in use by another account
export async function verifyEmailForChange(email, userRole) {
    const apiClient = new APIClient("/register/clickVerification");
    const res = await apiClient.post({
        email,
        userRole,
    });
    console.log('verifyEmailforChange res returned as: ', res);
    const data = res?.data;
    if (data.code === 100 && data.msg !== "Already verified") {
        console.log('returning true!');
        return true;
    }
    console.log('returning false!');
    return false;
}

export async function sendVerification(email) {
    const apiClient = new APIClient("/register/clickVerification");
    const res = await apiClient.post({
        email,
    });
    console.log('sendVerification res returned as: ', res);
}

export async function getUserData() {
    try {
        const apiClient = new APIClient("/user/fetch_user_profile");
        const res = await apiClient.post();
        console.log('getUserProfile res is: ', res);
        return res;
    } catch (err) {
        throw new Error('Unable to retrieve user info', err);
    }
    
}

export async function setUserData(userData) {
    const incorrectPasswordMsg = 'Incorrect password, please try again.';
    try {
        const apiClient = new APIClient("/user/set_user_profile");
        const res = await apiClient.post(userData);
        console.log('setUserProfile res is: ', res);
        if (res?.data?.code === 506) {
            throw new Error(incorrectPasswordMsg);
        }
        return res;
    } catch (err) {
        if (err.message === incorrectPasswordMsg) {
            throw new Error(incorrectPasswordMsg);
        }
        throw new Error('Unable to send userData to backend');
    }
}
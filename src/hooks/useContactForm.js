import axios from 'axios';

const contactUrl = 'http://api-dev.charm-life.com/user/contact_us';

export async function ContactSubmission(submissionObj) {
    const sendSubmission = async (data) => {
        try {
            console.log(`Sending contact form data to ${contactUrl}`);
            const res = await axios.post(contactUrl, data);
            console.log(`Res returned as: ${res}`);
            return res;
        } catch (error) {
            console.log(`Error sending contact form data: ${error}`);
            throw new Error('Unable to send data');
        }
    }
    const returnedInfo = await sendSubmission(submissionObj);
    console.log('Returned info is: ', returnedInfo);
}

const delay = ms => new Promise(res => setTimeout(res, ms));
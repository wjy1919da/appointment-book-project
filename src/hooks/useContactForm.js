import axios from 'axios';

const contactUrl = 'http://api-dev.charm-life.com/user/contact_us';

export async function ContactSubmission(submissionObj) {
    const sendSubmission = async (data) => {
        try {
            const res = await axios.post(contactUrl, data);
            return res;
        } catch (error) {
            throw new Error('Unable to send data');
        }
    }
    const returnedInfo = await sendSubmission(submissionObj);
}
import { nanoid } from 'nanoid';
import Verification from '../../../routes/verification/verificaiton.component';
/*
video-call: https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg
voice: https://appointment-icons.s3.us-west-1.amazonaws.com/voice-icon.svg
phone: https://appointment-icons.s3.us-west-1.amazonaws.com/phone-icon.svg
*/

import VerificationStatus from '../../../assets/doctor/doctor-verification-status.svg';
import VerificationStatusGray from '../../../assets/doctor/doctor-verification-status-gray.svg';
import Declined from '../../../assets/doctor/doctor-declined-gray.svg';

export const appointmentData = [
  {
    id: nanoid(),
    time: '9:00 AM - 9:30 AM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/voice-icon.svg',
    ],
    await: 'Chloe Mandez',
    tag1: 'Injection',
    tag2: 'Breasts',
    icon: Declined,
    status: 'Declined',
  },
  {
    id: nanoid(),
    time: '9:30 AM - 10:00 AM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Chloe Mandez',
    tag1: 'Injection',
    tag2: 'Lips',
    icon: VerificationStatusGray,
    status: 'Confirmed',
  },

  {
    id: nanoid(),
    time: '10:00 AM - 10:30 AM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Jessica Mandez',
    tag1: 'Injection',
    tag2: 'Breasts',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '10:30 AM - 11:00 AM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/voice-icon.svg',
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Waiting for Booking',
    status: 'Close Slot',
  },
  {
    id: nanoid(),
    time: '11:00 AM - 11:30 AM',
    src: '',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '11:30 AM - 12:00 PM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/voice-icon.svg',
    ],
    await: 'William Zhu',
    tag1: 'Breasts',
    tag2: 'Nose',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '12:00 PM - 12:30 PM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/voice-icon.svg',
    ],
    await: 'Jenny',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '12:30 PM - 1:00 PM',
    src: ['https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg'],
    await: 'Chloe Mandez',
    cancel: 'Appointment was Cancelled',
    status: 'Confirm and Refund',
  },
  {
    id: nanoid(),
    time: '1:00 PM - 1:30 PM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Chloe Mandez',
    tag1: 'Injections',
    tag2: 'Lips',
    icon: VerificationStatus,
    // icon: require('../../../assets/doctor/VerificationStatus.png').default,
    status: 'Confirmed',
  },
  {
    id: nanoid(),
    time: '1:30 PM - 2:00 PM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Chloe Mandez',
    cancel: 'Appointment was Cancelled',
    status: 'Confirm and Refund',
  },
  {
    id: nanoid(),
    time: '2:00 PM - 2:30 PM',
    src: [
      'https://appointment-icons.s3.us-west-1.amazonaws.com/video-call-icon.svg',
    ],
    await: 'Chloe Mandez',
    cancel: 'Appointment was Cancelled',
    status: 'Confirm and Refund',
  },
  {
    id: nanoid(),
    time: '2:30 PM - 3:00 PM',
    src: '',
    status: 'Open Slot',
  },

  {
    id: nanoid(),
    time: '3:00 PM - 3:30 PM',
    src: '',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '3:30 PM - 4:00 PM',
    src: '',
    status: 'Open Slot',
  },
];

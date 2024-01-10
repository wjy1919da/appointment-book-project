import { nanoid } from 'nanoid';
// import Video from '../../../assets/doctor/video-call-icon.svg';
// import Voice from '../../../assets/doctor/voice-icon.svg';

export const appointmentData = [
  {
    id: nanoid(),
    time: '10:00 AM - 10:30 AM',
    src: require('../../../assets/doctor/video-call-icon.svg').default,
    await: 'Jessica Mandez',
    tag1: 'Injection',
    tag2: 'Breasts',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '10:30 AM - 11:00 AM',
    src: [
      require('../../../assets/doctor/video-call-icon.svg').default,
      require('../../../assets/doctor/voice-icon.svg').default,
    ],
    await: 'Waiting for Booking',
    status: 'Close Slot',
  },
  {
    id: nanoid(),
    time: '11:00 AM - 11:30 AM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '11:30 AM - 12:00 PM',
    src: require('../../../assets/doctor/phone-icon.svg').default,
    await: 'William Zhu',
    tag1: 'Breasts',
    tag2: 'Nose',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '12:00 PM - 12:30 PM',
    src: [
      '../../../assets/doctor/video-call-icon.svg',
      '../../../assets/doctor/voice-icon.svg',
      '../../../assets/doctor/phone-icon.svg',
    ],
    await: 'Waiting for Booking',
    status: 'Close Slot',
  },
  {
    id: nanoid(),
    time: '12:30 PM - 1:00 PM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '1:00 PM - 1:30 PM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '1:30 PM - 2:00 PM',
    src: require('../../../assets/doctor/phone-icon.svg').default,
    await: 'Chloe Mandez',
    tag1: 'Breasts',
    tag2: 'Nose',
    status: 'Confirm',
  },
  {
    id: nanoid(),
    time: '2:00 PM - 2:30 PM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '3:00 PM - 3:30 PM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
  {
    id: nanoid(),
    time: '3:30 PM - 4:00 PM',
    src: '',
    await: 'Not Open',
    status: 'Open Slot',
  },
];

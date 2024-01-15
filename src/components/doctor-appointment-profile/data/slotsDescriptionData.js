import { nanoid } from 'nanoid';

export const slotsDescriptionData = [
  {
    id: nanoid(),
    icon: '1',
    description: 'Time spots are opened, but no appointment.',
  },
  {
    id: nanoid(),
    icon: '1',
    description: 'All time spots are closed, no appointment.',
  },
  {
    id: nanoid(),
    icon: '1',
    dot: require('../../../assets/doctor/pink_dot.svg').default,
    description: 'Appointments to be confirmed.',
  },
  {
    id: nanoid(),
    icon: '1',
    description: 'Have appointments.',
  },
  {
    id: nanoid(),
    icon: '1',
    dot: require("../../../assets/doctor/pink_dot.svg").default,
    description: 'Have both appointments and wait to be confirmed.',
  },
  {
    id: nanoid(),
    icon: '1',
    description: 'Selected.',
  },
];

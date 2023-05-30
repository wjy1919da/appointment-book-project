// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AllField = {
  "FACIAL": "FACIAL",
  "BODY": "BODY",
  "BREAST": "BREAST",
  "FACIALBODY": "FACIALBODY",
  "FACIALBREAST": "FACIALBREAST",
  "BODYBREAST": "BODYBREAST",
  "FACIALBODYBREAST": "FACIALBODYBREAST"
};

const AllState = {
  "CA": "CA",
  "NY": "NY",
  "TX": "TX"
};

const AllCity = {
  "LA": "LA",
  "SANTAMONICA": "SANTAMONICA",
  "SANFRANCISCO": "SANFRANCISCO",
  "NEWPORTBEACH": "NEWPORTBEACH",
  "SANDIEGO": "SANDIEGO",
  "NEWYORK": "NEWYORK",
  "DALLAS": "DALLAS"
};

const { Procedure, Doctor } = initSchema(schema);

export {
  Procedure,
  Doctor,
  AllField,
  AllState,
  AllCity
};
import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum AllField {
  FACIAL = "FACIAL",
  BODY = "BODY",
  BREAST = "BREAST",
  FACIALBODY = "FACIALBODY",
  FACIALBREAST = "FACIALBREAST",
  BODYBREAST = "BODYBREAST",
  FACIALBODYBREAST = "FACIALBODYBREAST"
}

export enum AllState {
  CA = "CA",
  NY = "NY",
  TX = "TX"
}

export enum AllCity {
  LA = "LA",
  SANTAMONICA = "SANTAMONICA",
  SANFRANCISCO = "SANFRANCISCO",
  NEWPORTBEACH = "NEWPORTBEACH",
  SANDIEGO = "SANDIEGO",
  NEWYORK = "NEWYORK",
  DALLAS = "DALLAS"
}



type EagerProcedure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Procedure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly what?: string | null;
  readonly why?: string | null;
  readonly options?: string | null;
  readonly lifeAfter?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProcedure = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Procedure, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly what?: string | null;
  readonly why?: string | null;
  readonly options?: string | null;
  readonly lifeAfter?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Procedure = LazyLoading extends LazyLoadingDisabled ? EagerProcedure : LazyProcedure

export declare const Procedure: (new (init: ModelInit<Procedure>) => Procedure) & {
  copyOf(source: Procedure, mutator: (draft: MutableModel<Procedure>) => MutableModel<Procedure> | void): Procedure;
}

type EagerDoctor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Doctor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phoneNum?: number | null;
  readonly email?: string | null;
  readonly zipcode?: number | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly field?: string | null;
  readonly workYear?: number | null;
  readonly info?: string | null;
  readonly intro?: string | null;
  readonly iconPic?: string | null;
  readonly bkgdPic?: string | null;
  readonly profilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDoctor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Doctor, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly phoneNum?: number | null;
  readonly email?: string | null;
  readonly zipcode?: number | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly field?: string | null;
  readonly workYear?: number | null;
  readonly info?: string | null;
  readonly intro?: string | null;
  readonly iconPic?: string | null;
  readonly bkgdPic?: string | null;
  readonly profilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Doctor = LazyLoading extends LazyLoadingDisabled ? EagerDoctor : LazyDoctor

export declare const Doctor: (new (init: ModelInit<Doctor>) => Doctor) & {
  copyOf(source: Doctor, mutator: (draft: MutableModel<Doctor>) => MutableModel<Doctor> | void): Doctor;
}
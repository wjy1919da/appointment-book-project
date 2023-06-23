import { create } from 'zustand';
interface DoctorQuery{
    doctorName?: string;
    location?: string;
    field?: string;
    pageSize?: number;
    isModelOpen?: boolean;
    memberID:number;
}
interface doctorQueryStore{
    doctorQuery: DoctorQuery;
    setDoctorName: (doctorName: string) => void;
    setLocation: (location: string) => void;
    setField: (field: string) => void;
    setPageSize: (pageSize: number) => void;
    setIsModelOpen: (isModelOpen: boolean) => void;
    setMemberID: (memberID:number) => void;
}
const useDoctorQueryStore = create<doctorQueryStore>((set) => ({ 
    doctorQuery: {pageSize: 20, isModelOpen:false, field:"", location:"",doctorName:"",memberID:0}, // pageSize default value 20
    setDoctorName: (doctorName) => 
        set((store) => ({ doctorQuery: {...store.doctorQuery, doctorName} })),
    setLocation: (location) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, location} })),
    setField: (field) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, field} })),
    setPageSize: (pageSize) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, pageSize} })),
    setIsModelOpen: (isModelOpen) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, isModelOpen} })),
    setMemberID: (memberID) =>
        set((store) => ({ doctorQuery: { ...store.doctorQuery, memberID } })),
}));  
export default useDoctorQueryStore;
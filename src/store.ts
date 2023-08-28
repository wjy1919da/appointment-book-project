import { create } from 'zustand';
interface DoctorQuery{
    doctorName?: string;
    location?: string;
    field?: string;
    pageSize?: number;
    nickName:string;
    memberId?:string;
}
interface doctorQueryStore{
    doctorQuery: DoctorQuery;
    setDoctorName: (doctorName: string) => void;
    setLocation: (location: string) => void;
    setField: (field: string) => void;
    setPageSize: (pageSize: number) => void; 
    setNickName: (setNickName:string) => void;
    setMemberId: (memberId:string) => void;
}
const useDoctorQueryStore = create<doctorQueryStore>((set) => ({ 
    doctorQuery: {pageSize: 20, field:"", location:"",doctorName:"",nickName:"",memberId:""}, // pageSize default value 20
    setDoctorName: (doctorName) => 
        set((store) => ({ doctorQuery: {...store.doctorQuery, doctorName} })),
    setLocation: (location) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, location} })),
    setField: (field) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, field} })),
    setPageSize: (pageSize) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, pageSize} })),
    setNickName: (nickName) =>
        set((store) => ({ doctorQuery: { ...store.doctorQuery, nickName } })),
    setMemberId: (memberId) =>
        set((store) => ({ doctorQuery: { ...store.doctorQuery, memberId } })),
}));  
export default useDoctorQueryStore;
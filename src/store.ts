import { create } from 'zustand';
interface DoctorQuery{
    doctorName?: string;
    location?: string;
    field?: string;
}
interface doctorQueryStore{
    doctorQuery: DoctorQuery;
    setDoctorName: (doctorName: string) => void;
    setLocation: (location: string) => void;
    setField: (field: string) => void;
}
const useDoctorQueryStore = create<doctorQueryStore>((set) => ({ 
    doctorQuery: {},
    setDoctorName: (doctorName) => 
        set((store) => ({ doctorQuery: {...store.doctorQuery, doctorName} })),
    setLocation: (location) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, location} })),
    setField: (field) =>
        set((store) => ({ doctorQuery: {...store.doctorQuery, field} })),
}));  
export default useDoctorQueryStore;
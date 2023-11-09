import {create} from 'zustand';

interface DoctorReviewQuery {
  doctorId: string;
}

interface DoctorReviewQueryStore {
  doctorReviewQuery: DoctorReviewQuery;
  setDoctorId: (doctorId: string) => void;
}

const useDoctorReviewQueryStore = create<DoctorReviewQueryStore>((set) => ({
  doctorReviewQuery: { doctorId: '' },
  setDoctorId: (doctorId) =>
    set((state) => ({ doctorReviewQuery: { ...state.doctorReviewQuery, doctorId } })),
}));

export default useDoctorReviewQueryStore;
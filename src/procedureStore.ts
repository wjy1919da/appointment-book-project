import { create } from 'zustand';
interface ProcedureQuery {
    categories?: string;
    pageSize?: number;
}
interface procedureQueryStore {
    procedureQuery: ProcedureQuery;
    setCategories: (categories: string) => void;
}
const useProcedureQueryStore = create<procedureQueryStore>((set) => ({
    procedureQuery: { pageSize: 20, categories: "" }, // pageSize default value 20
    setCategories: (categories) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, categories } })),
}));
export default useProcedureQueryStore;
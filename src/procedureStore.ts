import { create } from 'zustand';
interface ProcedureQuery {
    categories?: string;
    pageSize?: number;
    categoryId?: number;
}
interface procedureQueryStore {
    procedureQuery: ProcedureQuery;
    setCategories: (categories: string) => void;
    setCategoryId: (categoryId: number) => void;
}
const useProcedureQueryStore = create<procedureQueryStore>((set) => ({
    procedureQuery: { pageSize: 20, categories: "",categoryId:1}, // pageSize default value 20
    setCategories: (categories) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, categories } })),
    setCategoryId: (categoryId) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, categoryId } }))
}));
export default useProcedureQueryStore;
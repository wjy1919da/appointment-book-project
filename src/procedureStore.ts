import { create } from 'zustand';

interface ProcedureQuery {
    categories?: string;
    pageSize?: number;
    categoryId?: number;
    procedureSearchParam?: string;
}
interface ProcedureQueryStore {
    procedureQuery: ProcedureQuery;
    setCategories: (categories: string) => void;
    setCategoryId: (categoryId: number) => void;
    setProcedureSearchParam: (procedureSearchParam: string) => void;
}

const useProcedureQueryStore = create<ProcedureQueryStore>((set) => ({
    procedureQuery: { pageSize: 20, categories: "", categoryId: 1, procedureSearchParam: "" }, // pageSize default value 20
    setCategories: (categories) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, categories } })),
    setCategoryId: (categoryId) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, categoryId } })),
    setProcedureSearchParam: (procedureSearchParam) =>
        set((store) => ({ procedureQuery: { ...store.procedureQuery, procedureSearchParam } }))
}));

export default useProcedureQueryStore;

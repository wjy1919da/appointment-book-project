import { create } from 'zustand';
interface PostQuery{
    filterType: number;
    pageSize: number;    
}
interface postQueryStore {
    postQuery: PostQuery;
    setFilterType: (filterType: number) => void;
    setPageSize: (pageSize: number) => void;
}
const usePostQueryStore = create<postQueryStore>((set) => ({
    postQuery: {pageSize: 20, filterType: 2},
    setFilterType: (filterType) => 
      set(state => ({postQuery: {...state.postQuery, filterType}})),
    setPageSize: (pageSize) =>
        set(state => ({postQuery: {...state.postQuery, pageSize}}))
}));
export default usePostQueryStore;
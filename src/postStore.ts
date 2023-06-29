import { create } from 'zustand';
interface PostQuery{
    filterType: number;
    pageSize: number;
    userID :number;      
}
interface postQueryStore {
    postQuery: PostQuery;
    setFilterType: (filterType: number) => void;
    setPageSize: (pageSize: number) => void;
    setUserID:(userID:number)=>void;
}
const usePostQueryStore = create<postQueryStore>((set) => ({
    postQuery: {pageSize: 35, filterType: 2,userID:0},
    setFilterType: (filterType) => 
      set(state => ({postQuery: {...state.postQuery, filterType}})),
    setPageSize: (pageSize) =>
        set(state => ({postQuery: {...state.postQuery, pageSize}})),
    setUserID:(userID)=>
        set(state=>({postQuery: {...state.postQuery, userID}})),
}));
export default usePostQueryStore;
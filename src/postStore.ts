import { create } from 'zustand';
interface PostQuery{
    filterType: number;
    pageSize: number;
    userID :number;  
    filterCondition?: Array<string>;  
    trigger: number;
}
interface postQueryStore {
    postQuery: PostQuery;
    setFilterType: (filterType: number) => void;
    setPageSize: (pageSize: number) => void;
    setUserID:(userID:number)=>void;
    setFilterCondition?: (filterCondition: Array<string>) => void;
    refresh: () => void;
}
const usePostQueryStore = create<postQueryStore>((set) => ({
    postQuery: {pageSize: 12, filterType: 2,userID:0,filterCondition:[],trigger:0},
    setFilterType: (filterType) => 
      set(state => ({postQuery: {...state.postQuery, filterType}})),
    setPageSize: (pageSize) =>
        set(state => ({postQuery: {...state.postQuery, pageSize}})),
    setUserID:(userID)=>
        set(state=>({postQuery: {...state.postQuery, userID}})),
    setFilterCondition: (filterCondition) =>
        set(state => ({postQuery: {...state.postQuery, filterCondition}})),
    refresh: () =>
        set(state => ({postQuery: {...state.postQuery, trigger: state.postQuery.trigger + 1}})),
}));
export default usePostQueryStore;
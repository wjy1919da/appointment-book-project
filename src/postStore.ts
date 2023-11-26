import { create } from 'zustand';

interface PostQuery {
  filterType: number;
  pageSize: number;
  userID: number;
  filterCondition?: Array<string>;
  trigger: number;
  postBy?: Array<string>;
  tag: string;
  tempSearchParam?: string;
  postSearchParam?: string;
}

interface postQueryStore {
  postQuery: PostQuery;
  setFilterType: (filterType: number) => void;
  setPostBy: (postBy: Array<string>) => void;
  setTag: (tag: string) => void;
  setPageSize: (pageSize: number) => void;
  setUserID: (userID: number) => void;
  setFilterCondition?: (filterCondition: Array<string>) => void;
  refresh: () => void;
  setTempSearchParam?: (tempSearchParam: string) => void;
  setPostSearchParam?: (postSearchParam: string) => void;
}
const usePostQueryStore = create<postQueryStore>((set) => ({
  postQuery: {
    pageSize: 12,
    filterType: 2,
    userID: 0,
    filterCondition: [],
    postBy: ['doctor', 'user'],
    tag: '',
    trigger: 0,
    tempSearchParam: '',
    postSearchParam: '',
  },
  setFilterType: (filterType) =>
    set((state) => ({ postQuery: { ...state.postQuery, filterType } })),
  setPageSize: (pageSize) =>
    set((state) => ({ postQuery: { ...state.postQuery, pageSize } })),
  setUserID: (userID) =>
    set((state) => ({ postQuery: { ...state.postQuery, userID } })),
  setFilterCondition: (filterCondition) =>
    set((state) => ({ postQuery: { ...state.postQuery, filterCondition } })),
  setTempSearchParam: (tempSearchParam) =>
    set((state) => ({ postQuery: { ...state.postQuery, tempSearchParam } })),
  setPostSearchParam: (postSearchParam) =>
    set((state) => ({ postQuery: { ...state.postQuery, postSearchParam } })),
  setPostBy: (postBy) =>
    set((state) => ({ postQuery: { ...state.postQuery, postBy } })),
  setTag: (tag) => set((state) => ({ postQuery: { ...state.postQuery, tag } })),
  refresh: () =>
    set((state) => ({
      postQuery: { ...state.postQuery, trigger: state.postQuery.trigger + 1 },
    })),
}));

export default usePostQueryStore;

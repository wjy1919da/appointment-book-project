import { create } from 'zustand';

interface PostQuery {
  filterType: number;
  pageSize: number;
  postID: number;
  userName: string;
  userAvatar: string;
  filterCondition?: Array<string>;
  trigger: number;
  postBy?: Array<string>;
  tag: string;
  tempSearchParam?: string;
  postSearchParam?: string;
  title?: string;
  description?: string;
  pictures?: Array<string>;
  // memberId is autherId
  memberID?: number;
  tempCommentStatus: string;
  commentId?: number;
  isPrivate?: boolean;
  isHighlight?: boolean;
}

interface postQueryStore {
  postQuery: PostQuery;
  setFilterType: (filterType: number) => void;
  setPostBy: (postBy: Array<string>) => void;
  setTag: (tag: string) => void;
  setPageSize: (pageSize: number) => void;
  setPostID: (userID: number) => void;
  setUserName: (userName: string) => void;
  setUserAvatar: (userAvatar: string) => void;
  setFilterCondition?: (filterCondition: Array<string>) => void;
  refresh: () => void;
  setTempSearchParam?: (tempSearchParam: string) => void;
  setPostSearchParam?: (postSearchParam: string) => void;
  setTitle?: (title: string) => void;
  setDescription?: (description: string) => void;
  setPictures?: (pictures: Array<string>) => void;
  setMemberID?: (memberID: number) => void;
  setTempCommentStatus: (isOpen: boolean, status: string) => void;
  setCommentId?: (commentId: number) => void;
  setIsPrivate?: (isPrivate: boolean) => void;
  setIsHighlight?: (isHighlight: boolean) => void;
}

const usePostQueryStore = create<postQueryStore>((set) => ({
  postQuery: {
    pageSize: 12,
    filterType: 2,
    postID: 0,
    userName: '',
    userAvatar: '',
    filterCondition: [],
    postBy: ['doctor', 'user'],
    tag: '',
    trigger: 0,
    tempSearchParam: '',
    postSearchParam: '',
    title: '',
    description: '',
    pictures: [],
    memberID: 0,
    tempCommentStatus: '',
    commentId: 0,
    isPrivate: false,
    isHighlight: false,
  },
  setFilterType: (filterType) =>
    set((state) => ({ postQuery: { ...state.postQuery, filterType } })),
  setPageSize: (pageSize) =>
    set((state) => ({ postQuery: { ...state.postQuery, pageSize } })),
  setPostID: (postID) =>
    set((state) => ({ postQuery: { ...state.postQuery, postID } })),
  setUserName: (userName) =>
    set((state) => ({ postQuery: { ...state.postQuery, userName } })),
  setUserAvatar: (userAvatar) =>
    set((state) => ({ postQuery: { ...state.postQuery, userAvatar } })),
  setFilterCondition: (filterCondition) =>
    set((state) => ({ postQuery: { ...state.postQuery, filterCondition } })),
  setTempSearchParam: (tempSearchParam) =>
    set((state) => ({ postQuery: { ...state.postQuery, tempSearchParam } })),
  setPostSearchParam: (postSearchParam) =>
    set((state) => ({ postQuery: { ...state.postQuery, postSearchParam } })),
  setPostBy: (postBy) =>
    set((state) => ({ postQuery: { ...state.postQuery, postBy } })),
  setTag: (tag) => set((state) => ({ postQuery: { ...state.postQuery, tag } })),
  setTitle: (title) =>
    set((state) => ({ postQuery: { ...state.postQuery, title } })),
  setDescription: (description) =>
    set((state) => ({ postQuery: { ...state.postQuery, description } })),
  setPictures: (pictures) =>
    set((state) => ({ postQuery: { ...state.postQuery, pictures } })),
  setMemberID: (memberID) =>
    set((state) => ({ postQuery: { ...state.postQuery, memberID } })),
  setTempCommentStatus: (isOpen, status) =>
    set((state) => ({
      postQuery: {
        ...state.postQuery,
        tempCommentStatus: isOpen ? status : '',
      },
    })),
  setCommentId: (commentId) =>
    set((state) => ({ postQuery: { ...state.postQuery, commentId } })),
  setIsPrivate: (isPrivate) =>
    set((state) => ({ postQuery: { ...state.postQuery, isPrivate } })),
  setIsHighlight: (isHighlight) =>
    set((state) => ({ postQuery: { ...state.postQuery, isHighlight } })),
  refresh: () =>
    set((state) => ({
      postQuery: { ...state.postQuery, trigger: state.postQuery.trigger + 1 },
    })),
}));

export default usePostQueryStore;

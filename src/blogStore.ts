import {create} from "zustand";

interface BlogPost {
    address: string;
    brief: string;
    coverImg: string;
    id: number;
    isDisplay: number;
    lat: string;
    location: string;
    lon: string;
    pictures: string[];
    tags: { tagId: number; tagName: string }[];
    title: string;
}

interface BlogState {
    posts: BlogPost[];
    addPost: (post: BlogPost) => void;
}

const useBlogStore = create<BlogState>((set) => ({
    posts: [],
    addPost: (post: BlogPost) => {
        set((store) => ({
            posts: [...store.posts, post]
        }));
    }
}));

export default useBlogStore;
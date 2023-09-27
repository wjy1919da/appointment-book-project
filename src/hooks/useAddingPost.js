import axios from 'axios';
import { useMutation } from 'react-query';
import useBlogStore from '../blogStore.ts';
import Cookies from 'js-cookie';
export function useAddPost() {

    const addPost = useBlogStore(state => state.addPost);

    const sendPostToServer = async (postData) => { // Removed the type here
        const res = await axios.post("http://localhost:8080/post/posts", postData);
        console.log("Response from server:", res.data);
        return res.data;
    };

    return useMutation(
        (newPostData) => sendPostToServer(newPostData), // Removed the type here
        {
            onSuccess: (data) => {
                console.log("Post added successfully:", data); 
                addPost(data);
            },
            onError: (error) => {
                console.log("Error adding post:", error);
                if (error.response && error.response.data) {
                    console.log("Server response:", error.response.data);
                }
            }
        }
    );
}
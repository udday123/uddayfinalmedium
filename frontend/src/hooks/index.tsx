import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../pages/config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    author: {  
      name: string;
      id: string; 
    };
  }
  
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/all`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setBlogs(response.data.allblogs)
            setLoading(false)
        })
    },[])
    return { loading, blogs };
}
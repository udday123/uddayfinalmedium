import axios from "axios";
import { BACKEND_URL } from "../pages/config";
import { useState, useEffect } from "react";

interface Blog {
    id:string
  title: string;
  content:string
  author :{
    name:string,
    id:string
  }
}

export const useSpecificBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem('token')
        }})
      .then((response) => {
        setBlog(response.data.desireblog);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};

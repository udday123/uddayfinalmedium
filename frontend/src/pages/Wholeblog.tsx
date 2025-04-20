import { useParams } from "react-router-dom";
import { useSpecificBlog } from "../hooks/specificblog";
import { FullBlog } from "./FullBlog";
export function WholeBlog(){
    const {id}=useParams()
    if(!id){
        return(
            <div>Can't Go Anywhere</div>
        )
    }
    const { blog, loading } = useSpecificBlog({ id:id||"" });
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if (!blog) {
        return <div>Blog Doesn't Exist</div>;
      }
      return (
        <div>
          <FullBlog blog={blog} />
        </div>
      )
    }
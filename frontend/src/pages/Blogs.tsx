import { useBlogs } from "../hooks";
import { Blogcard } from "./Blogcard";
import { Link } from "react-router-dom";
export function Blogwrapper(){
    const {loading,blogs}=useBlogs();
    if(loading){
        return(
            <>
                <div>Loading...</div>
            </>
        )
    }
    return (
        <div>
           {blogs.map((x)=>
           (
            <Link key={x.id} to={`/blog/${x.id}`} className="block">
            <Blogcard   authorname={x.author.name} title={x.title}  content={x.content}  publishedDate="23 March 2025"></Blogcard>
            </Link>
            )
        )}
        </div>
    )
}

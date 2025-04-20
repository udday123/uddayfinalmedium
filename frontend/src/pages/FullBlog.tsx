import { Blog } from "../hooks/index"
import { Avatar } from "./avatarCard"
export const FullBlog = ({blog}:{blog?:Blog})=>{
    if (!blog) {
        return <div>No Blog Found</div>;
      }
    return(
        <>
            <div className="flex justify-center">  
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">  
                    <div className="col-span-8">  
                    <h1 className="text-5xl font-extrabold">{blog.title}</h1>  
                    <div className="text-slate-500 pt-2">  
                        Post on 2nd December 2023  
                    </div>  
                    <div className="pt-4">  
                        {blog.content}  
                    </div>  
                    </div>  
                    <div className="col-span-4">  
                        Author
                        <div className="flex">
                            <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name}></Avatar>
                            </div>
                            <div>
                                <div className="text-xl font-bold">{blog.author.name}</div>
                                <div className="pt-2 text-slate-500"> Random Catch Phrase</div>
                            </div>  
                        </div>
                    </div>
                        
                    
                </div>  
                </div>  
        </>
    )
}
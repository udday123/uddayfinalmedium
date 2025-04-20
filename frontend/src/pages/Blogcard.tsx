import { Avatar } from "./avatarCard"

interface BlogProps {
    authorname:string
    title:string,
    content:string,
    publishedDate:string
}

export function Blogcard({
    authorname,
    title,
    content,
    publishedDate
}:BlogProps){
    return (
        <>
        <div className=" pl-2 rounded-md shadow-xl cursor-pointer  pt-5 border border-l-0 border-slate-200 ml-8 mt-6 mr-8">
            
            <div className="flex mb-2">
                <Avatar name={authorname}/>
                        <div className="flex">
                            <div className="mt-2 ml-2 flex font-semibold">{authorname} .</div>
                            <div className="ml-2 mt-2 text-slate-500">{publishedDate}</div> 
                        </div> 
            </div> 
            
            <div className="font-extrabold mb-1 text-lg" >
                {title}
            </div>
            <div className="font-serif mb-2">
                {content.length > 100 ? content.slice(0, 100) + "..." : content}
            </div>

            <div className="bg-slate-200 h-6 w-28 ml-1.5 pl-2 inline-block text-wrap rounded-lg text-md">
                {Math.ceil(content.length/100)} minute read 
            </div>
            <div className="bg-slate-200 h-1 w-full mt-4"></div>


        </div>

        </>
        
    )
}
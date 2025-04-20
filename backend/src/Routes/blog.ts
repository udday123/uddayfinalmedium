import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt, { hash, compare } from 'bcryptjs'
import { string } from 'zod'

export const blogRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string
        },
        Variables:{
            userId:string
        }
}>()

blogRouter.use("/*",async (c,next)=>{
    //extract user id and pass it downn to authorId
    const authheader=c.req.header('Authorization')||""
    const user=await verify(authheader,c.env.JWT_SECRET) as {id:string};
    
    if(user){
        c.set("userId",user.id);
        await next()
    }
    else{
        return c.json({
            message:"you are not logged in"
        })
    }
})

blogRouter.post('/create', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());


    try{
    const body=await c.req.json()
    const authid=c.get("userId")
    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authid
        }
    })
    return c.json({
        id:blog.id
    })
    }catch(error){
        return c.json({ error: "Failed to create blog" }, 500);
    }
    
})

blogRouter.put('/update',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    try{
    const body=await c.req.json();

    const blog=await prisma.post.update({
        where:{id:body.id},
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        id:blog.id
    })
    }catch (error) {
        return c.json({ error: "Failed to update blog" }, 500);
    }
})   

blogRouter.get('/:id', async(c)=>{
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

    try{
    const desireblog=await prisma.post.findFirst({
        where:{id:id},
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true,
                    id:true
                }
            }
        }
    })
    return c.json({
        desireblog
    })
    }catch (error) {
        return c.json({ error: "Failed to fetch blog" }, 500);
    }
})

blogRouter.get('/bulk/all',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());

      try{
        const allblogs=await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
        allblogs
      })
      }catch (error) {
        return c.json({ error: "Failed to fetch blogs" }, 500);
    }
})
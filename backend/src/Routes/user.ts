import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt, { hash, compare } from 'bcryptjs'
import { signupInput } from '../zod'

export const userRouter = new Hono<{
	Bindings: {
	DATABASE_URL: string,
  JWT_SECRET:string
	}
}>();
//npm install --save-dev wrangler@4
userRouter.post('/signup', async (c) => {
    try{
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body=await c.req.json();
      //sanitization 
      const {success}=signupInput.safeParse(body);

      if(!success){
        return c.json({
          message:"Inputs are invalid"
        })
      }

      const hashpassword=await hash(body.password,10);

      const existingUser = await prisma.user.findFirst({
        where: { email: body.email },
      });

      if (existingUser) {
        
        return c.json({ message: "User already exists" }, 409);
        
      }      
      
      const user=await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:hashpassword
        },
      })

      const jwt=await sign({id:user.id}, c.env.JWT_SECRET)
      return c.json({token:jwt})
      
    }

    catch(error){
      return c.json({error:"Something went wrong"})
    }

})

userRouter.post('/signin',async (c)=>{
  try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!existingUser) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    // Then, compare hashed password
    const isPasswordValid = await compare(body.password, existingUser.password);
    if (!isPasswordValid) {

      return c.json({ message: "Invalid email or password" }, 401);
      
    }
    const jwt = await sign({ id: existingUser.id }, c.env.JWT_SECRET);

		return c.json({ token: jwt });
  }catch(error){
    return c.json({message:"Something went wrong"})
  }
})

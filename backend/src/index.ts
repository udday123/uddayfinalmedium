import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt, { hash, compare } from 'bcryptjs'
import { userRouter } from './Routes/user'
import { blogRouter } from './Routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
	DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

app.use('/*',cors())

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter)

export default app
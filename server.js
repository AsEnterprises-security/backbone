import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/db.js';
import adminRouter from './routes/admin.routes.js';
import imageRouter from './routes/image.routes.js';


const app = express()

await connectDB()

//middlewares
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running....')
})
app.use('/api/admin',adminRouter)
app.use('/api/image',imageRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT); 
})

export default app;




import express from 'express';
import 'dotenv/config'
import cors from 'cors';


const app = express()

//middlewares
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running....')
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT); 
})

export default app;




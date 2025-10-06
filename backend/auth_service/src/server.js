import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js'



const app = express();
const PORT = process.env.PORT || 6002

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//middleware for json files
app.use(express.json());

//For auth routes
app.use('/api/v1/auth',authRoutes)

//For profilepic storeage
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}))

app.get('/', (req,res)=>{
    res.send('<h1>Hello world</h1>')
})

app.get('/uploads', (req,res)=>{
    res.sendFile(uploads)
})


app.listen(PORT, ()=>{
    console.log(`Server started in port : ${PORT}`)
})
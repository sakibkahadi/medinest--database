import express, { Application, Request, Response } from "express";
import cors from 'cors'
import router from "./app/routes";
import globalErrorHandlers from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json'
//parser
app.use(express.json());
app.use(cors({origin:['http://localhost:5173']}));

//application routes

app.use('/api', router)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
const test = async(req:Request, res:Response)=>{
    const a = 555;
    res.json(a)
}
app.get('/', test)
app.use(globalErrorHandlers);
//not found route
app.use(notFound)

export default app
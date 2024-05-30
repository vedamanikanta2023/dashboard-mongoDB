import express from "express";
import { executeStudentCrudOperations } from "./src/sampleConnect.js";
import cors from "cors";


const app = express();
app.use(cors());

app.use(express.json());
const data = await executeStudentCrudOperations();

const getFilterObj = (obj)=>{
    const keys = Object.keys(obj);
    const newObj = {};
    keys.forEach((key)=>{
        newObj[key]=  {$regex: obj[key]};
    })
    return newObj;

}
// db.dashboard_data.find({"insight" : /.*Annual.*/});}

app.post('/dashboarddata',async(req,res)=>{
    try{
        const payload = getFilterObj(req.body);

        const dashboardData =await data.find({...payload}).limit(10).toArray();//
        const status = { };
        status["Status Code"]= 200;
        status.message = "Success";
        status.data = dashboardData;
        console.log('dashboardData sendinng...');
        // res.status=200;
        res.message = 'Success';
        // res.json(dashboardData);
        return res.send(status);
    } catch (err){
        res.status(500).json({message:err.message});
    }
});

const PORT =  3001;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
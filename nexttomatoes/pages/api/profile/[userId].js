import ConnectMongo from "../../../database/conn";
import { getUser, putUser, deleteUser } from "../../../database/controller.";

export default async function handler(req, res) {

    ConnectMongo().catch(() => res.status(405).json({error: "Erreur de connection"}))


    const {method} = req

    switch (method){
        case "GET":
            getUser(req,res);
            break
            case"PUT": 
            putUser(req,res)
            break;
    
            case"DELETE": 
            deleteUser(req, res);    
            break;

            default: 
        res.setHeader('Allow',['GET','POST','PUT','DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`)
        break;
        
    }
}

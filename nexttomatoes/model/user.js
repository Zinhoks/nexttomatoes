import {Schema, models, model} from "mongoose";

const userSchema = new Schema ({
    name:String,
    email:String,
    status:String,
})

const Users = models.users || model("users", userSchema)
export default Users;
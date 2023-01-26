const express = require ("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const cors = require('cors');


const mongoose = require ("mongoose")

app.use(express.json());
app.use(cors())
app.use("/users", userRouter)


mongoose.connect("mongodb+srv://francois:w4NLgB4r2LMfk4p@showtime.gen4dj7.mongodb.net/Tomatoes?retryWrites=true&w=majority")
.then(() => {
    app.listen(3010, () => {
        console.log("Server started on port n: 3010 have fun")
        });

})
.catch((error) => {
        console.log(error);
})


mongoose.set('strictQuery', true );

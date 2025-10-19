import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env variables
import app from "./src/App.js";
import dbConnect from "./src/db/db.js";
let port = 4000

dbConnect()

app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})


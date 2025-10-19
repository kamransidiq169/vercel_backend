import mongoose from "mongoose"
const dbConnect = async () => {
    const mongoConnect = await mongoose.connect('mongodb://localhost:27017/foodView')

    try {
        if (mongoConnect) {
            console.log(`mongo db connected successfully`);
        }
    } catch (error) {
        console.log(error);
    }

}

export default dbConnect
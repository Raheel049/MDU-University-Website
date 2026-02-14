import mongoose from "mongoose";

export const dbConnect = () => {

    const URI = process.env.MONGODB_URI
    mongoose.connect(URI)

    .then(() => console.log("Database connected successfully"))

    .catch((error) => {
        console.log("error", error)
    })
}


// import mongoose from "mongoose";

// export const dbConnect = async () => {
//     try {
//         // Aapka MONGO_URI .env file se aa raha hai
//         const conn = await mongoose.connect(process.env.MONGODB_URI, {
//             serverSelectionTimeoutMS: 30000, // 30 seconds tak wait karega
//             connectTimeoutMS: 30000,
//             family: 4
//         });

//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };
import mongoose from "mongoose";

const buildConnectionString = () => {
    const { MONGOOSE_USER, MONGOOSE_PWD,
         MONGOOSE_HOST, MONGOOSE_DB, MONGOOSE_PROTOCOL } = process.env;

    return `${MONGOOSE_PROTOCOL}://${MONGOOSE_USER}:${MONGOOSE_PWD}@${MONGOOSE_HOST}/${MONGOOSE_DB}?authSource=admin`;
    // return mongodb://bradisson:123456789@localhost:21017/tp3_node?authSource=admin
};

const connectDB = async () => {
    const connectionString = buildConnectionString();
    await mongoose.connect(connectionString);
    console.log("Connection to mongoDB SUCCESS");
};

export default connectDB;

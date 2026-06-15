import connectDB from "./src/database-config/database.js";
import fs from "fs/promises"
import "dotenv/config"
import { Tour } from "./src/models/tours.model.js";

const args = process.argv
console.log(args)

const importData = async () => {
    const data = await fs.readFile('../tp2-nodejs/dev-data/data/tours-simple.json', 'utf-8')
    await Tour.create(JSON.parse(data))
} 

const deleteData = async () => {
    await Tour.deleteMany();
}
connectDB().then(async () => {
    if (args[2] === "--import") {
        await importData()
    } else if (args[2] === "--delete" ){
        await deleteData();
    } else {
        console.log('Missing argument, you must use either --import or --delete')
        process.exit(1);
    }
    process.exit(0);
})
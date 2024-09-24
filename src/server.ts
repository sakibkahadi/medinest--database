import {Server} from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
let server: Server;
async function main() {
    try{
        await mongoose.connect(config.database_url as string);
        server = app.listen(config.port, ()=>{
            console.log(`Example app listening on port ${config.port}`)
        })
    }catch(err){
        console.log(err);
    }
}
main()
process.on('unhandledRejection', ()=>{
    console.log(`unhandledRejection is Detected, shouting down .......`)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1);
})
process.on('uncaughtException', ()=>{
    console.log(` unhandled Exception is Detected , shutting down`)
    process.exit(1)
})
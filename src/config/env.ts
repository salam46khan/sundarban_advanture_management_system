import dotenv from 'dotenv'
dotenv.config()

interface IenvVars {
    PORT: string,
    MONGODB_URI: string,
    NODE_ENV: string,
}

const loadEnvVariables = (): IenvVars =>{
    const requirdEnvVariable : string[] =["PORT", "MONGODB_URI", "NODE_ENV",]

    requirdEnvVariable.forEach(key =>{
        if(!process.env[key]){
            throw new Error(`missing env variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.MONGODB_URI as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
    }
}

export const envVars = loadEnvVariables()
import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import config from "../config";

const handleZodError = (err:ZodError):TGenericErrorResponse=>{
    const errorSources:TErrorSources = err.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length -1],
            message: issue?.message,
        };
    });
    const statusCode = 400;
    return{
        statusCode,
        message:'zod Error is',
        errorSources,
        stack: config.node_env === 'development'? err?.stack : null,
    }
}
export default handleZodError
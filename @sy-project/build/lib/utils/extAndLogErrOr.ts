import {logError} from "lib/utils/log";

export function exitAndLogErrOr(msg:string,err:Error){
    logError(Error(msg))
    logError(err)
    process.exit(1)
}

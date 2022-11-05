//this function creates an error to be used as a parameter in "next"


export const createError = (status, message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err
}
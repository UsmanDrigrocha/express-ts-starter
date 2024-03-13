import response from "./apiresponse";


export const errorHandler = (res: any, err: any) => {

    response.useErrorResponse(res, 'Something went wrong', err, 500);

}

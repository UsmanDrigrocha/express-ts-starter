
const useSuccessResponse = async (res: any, message: string, data: any, statusCode: any) => {
    return await res.status(statusCode).json({
        message,
        success: true,
        data,
    })
}
const useErrorResponse = async (res: any, message: String, error: any, statusCode: any) => {
    return await res.status(statusCode).json({
        success: false,
        message,
        error
    }
    )
}
const response = {
    useErrorResponse,
    useSuccessResponse
}
export default response
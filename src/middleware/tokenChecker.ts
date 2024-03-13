import jwt from 'jsonwebtoken';
import User from '../models/user';
import response from '../services/apiresponse';
require('dotenv').config()



const verifyToken = async (req: any, res: any, next: () => void) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1]
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        req.token = true

        const { userId } = req.user
        const user = await User.findOne({ _id: userId })

        if (user.tokenVersion == req.user.tokenVersion && decoded) {
            next();
        }

        else {
            return response.useErrorResponse(res, 'The token expired or is invalid', true, 401);
        }

    }
    catch (err) {
        console.error(err)
        return response.useErrorResponse(res, 'Expired token or token not found', true, 401);

    }
}
export const checkToken = (req: any, res: any, next: () => void) => {
    let token: String;
    if (req.headers.authorization) {
        token = req.headers.authorization.split('Bearer ')[1]
        if (token != 'null') {

            verifyToken(req, res, next)
        } else {
            req.token = false
            next();
        }
    } else {
        req.token = false
        next();
    }

}


export default verifyToken 

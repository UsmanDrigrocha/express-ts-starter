import multer from "multer";
import path from "path";
import fs from "fs";
import response from "../services/apiresponse";
import { errorHandler } from "./handleResponse";

const uploadfile = async (req: any, res: any) => {
  try {
    var fileName: any;
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const publicDir = path.join("", "public");
        const imagesDir = path.join(publicDir, "uploads");

        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir);
        }

        cb(null, imagesDir);
      },
      filename: async (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        fileName =
          file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".").pop();

        cb(null, fileName);
      },
    });
    const upload = multer({ storage }).single("file");

    upload(req, res, async (err: any) => {
      if (err) {
        console.log(err);
      } else {
        return response.useSuccessResponse(res, "success", fileName, 200);
      }
    });
  } catch (err) {
    console.log(err);

    return errorHandler(res, err);
  }
};

export { uploadfile };

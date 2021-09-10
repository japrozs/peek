import { Router } from "express";
import { expressIsAuth } from "../middleware/isAuth";
import multer, { FileFilterCallback } from "multer";
import { v4 } from "uuid";
import { Podcast } from "../entities/Podcast";

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: "podcasts",
        filename: async (_, _file: any, callback: any) => {
            const name = await v4();
            callback(null, name + ".mp3"); // e.g. jh34gh2v4y + .png
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        console.log("mimetype : ", file.mimetype);
        if (file.mimetype.includes("audio")) {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/upload",
    expressIsAuth,
    upload.single("file"),
    async (req, res) => {
        await Podcast.create({
            creatorId: req.session.userId,
            title: req.body.title,
            fileUrl: `http://localhost:4000/${req.file?.path}`,
        }).save();
        console.log(req.file);
        return res.json({ success: true });
    }
);
export default router;

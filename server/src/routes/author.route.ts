import { Router } from "express";
import { authorData, updateAuthor } from "../controllers/author.controller";


const authorRouter = Router();

authorRouter.get("/author", authorData);
authorRouter.put("/update/data", updateAuthor);

export default authorRouter;

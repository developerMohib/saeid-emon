import { Router } from "express";
import {  getBanner2,  upsertSingleBanner } from "../controllers/banner.controller";

const bannerRouter = Router();

bannerRouter.get("/banner", getBanner2);
bannerRouter.put("/update/banner", upsertSingleBanner);

export default bannerRouter;

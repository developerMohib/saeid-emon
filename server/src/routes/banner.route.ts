import { Router } from "express";
import {  getBanner2,  updateBanner2 } from "../controllers/banner.controller";

const bannerRouter = Router();

bannerRouter.get("/banner", getBanner2);
bannerRouter.put("/update/banner", updateBanner2);

export default bannerRouter;

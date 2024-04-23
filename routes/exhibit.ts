import { Router } from "express";
import {
  getExhibition,
  getFavorites,
  addFavorites,
  getCart,
  addCart,
  removeCart,
  getPurchase,
  addPurchase,
  addPreferences
} from "../controllers/exhibits";

const router = Router();

router.get("/", getExhibition);
router.route("/favorite").get(getFavorites).post(addFavorites);
router.route("/cart").get(getCart).post(addCart).delete(removeCart);
router.route("/purchase").get(getPurchase).post(addPurchase);
router.post("/preferences", addPreferences);

export { router as exhibit };

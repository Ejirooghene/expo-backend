"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPreferences = exports.addPurchase = exports.getPurchase = exports.removeCart = exports.addCart = exports.getCart = exports.addFavorites = exports.getFavorites = exports.getExhibition = void 0;
// import mongoose from "mongoose";
const models_1 = require("../models");
// ================  GET EXHIBITIONS =======================
const getExhibition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query.category;
        if (category !== "") {
            const exhibits = yield models_1.Exhibit.find({ category });
            return res.status(200).json(exhibits);
        }
        const exhibits = yield models_1.Exhibit.find();
        // const newExhibits = exhibits.sort(() => Math.random() - 0.5);
        res.status(200).json(exhibits);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getExhibition = getExhibition;
// ================  GET FAVORITES =======================
const getFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield models_1.User.findById(id).populate("favorite");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.favorite);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getFavorites = getFavorites;
// ================  ADD FAVORITES =======================
const addFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const favoriteId = req.body.itemId;
        const user = yield models_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const favoriteIndex = user.favorite.indexOf(favoriteId);
        if (favoriteIndex !== -1) {
            user.favorite.splice(favoriteIndex, 1);
            yield user.save();
            return res.status(200).json({
                message: "Item removed from favorites",
                data: (yield user.populate("favorite")).favorite,
            });
        }
        user.favorite.push(favoriteId);
        yield user.save();
        res.status(200).json({
            message: "Favorite added successfully",
            data: (yield user.populate("favorite")).favorite,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addFavorites = addFavorites;
// ================  GET CART =======================
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield models_1.User.findById(id).populate("cart");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCart = getCart;
// ================  ADD CART =======================
// export const addCart = async (req: Request, res: Response) => {
//   try {
//     const userId = req.body.userId;
//     const cartId = req.body.itemId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const cartIndex = user.cart.indexOf(cartId);
//     if (cartIndex !== -1) {
//       user.cart.splice(cartIndex, 1);
//       await user.save();
//       return res.status(200).json({
//         message: "Item removed from cart",
//         data: (await user.populate("cart")).cart,
//       });
//     }
//     user.cart.push(cartId);
//     await user.save();
//     res.status(200).json({
//       message: "Cart added successfully",
//       data: (await user.populate("cart")).cart,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        let cartIds = req.body.itemId; // Accept an array of cartIds
        if (!Array.isArray(cartIds)) {
            cartIds = [cartIds]; // Convert single itemId to array
        }
        const user = yield models_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        for (const cartId of cartIds) {
            const cartIndex = user.cart.indexOf(cartId);
            if (cartIndex !== -1) {
                user.cart.splice(cartIndex, 1);
            }
            else {
                user.cart.push(cartId);
            }
        }
        yield user.save();
        res.status(200).json({
            message: "Cart updated successfully",
            data: (yield user.populate("cart")).cart,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addCart = addCart;
// ================  REMOVE CART =======================
const removeCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const cartId = req.body.itemId;
        const user = yield models_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }
        user.cart = user.cart.filter((item) => item.toString() !== cartId);
        yield user.save();
        res.status(200).json({
            message: "Item removed successfully",
            data: (yield user.populate("cart")).cart,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.removeCart = removeCart;
// ================  GET PURCHASE =======================
const getPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const user = yield models_1.User.findById(id).populate("purchase");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.purchase);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getPurchase = getPurchase;
// ================  ADD CART =======================
const addPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const purchaseIds = req.body.itemIds; // Assuming you're receiving an array of itemIds
        console.log(purchaseIds);
        const user = yield models_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Concatenate the new purchaseIds with existing ones
        user.purchase = [...user.purchase, ...purchaseIds];
        user.cart = [];
        yield user.save();
        res
            .status(200)
            .json({ message: "Purchases added successfully", data: user.cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addPurchase = addPurchase;
const addPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, preferences } = req.body;
        const user = yield models_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const newUserPreferences = new Set([...user.preferences, ...preferences]);
        user.preferences = [...newUserPreferences];
        yield user.save();
        res.status(200).json({ message: "Preferences added successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addPreferences = addPreferences;

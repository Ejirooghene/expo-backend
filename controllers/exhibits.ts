import { Request, Response } from "express";
// import mongoose from "mongoose";
import { User, Exhibit } from "../models";

// ================  GET EXHIBITIONS =======================

export const getExhibition = async (req: Request, res: Response) => {
  try {
    const category = req.query.category;
    if (category !== "") {
      const exhibits = await Exhibit.find({ category });
      return res.status(200).json(exhibits);
    }
    const exhibits = await Exhibit.find();
    // const newExhibits = exhibits.sort(() => Math.random() - 0.5);
    res.status(200).json(exhibits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================  GET FAVORITES =======================

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const user = await User.findById(id).populate("favorite");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================  ADD FAVORITES =======================

export const addFavorites = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const favoriteId = req.body.itemId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteIndex = user.favorite.indexOf(favoriteId);
    if (favoriteIndex !== -1) {
      user.favorite.splice(favoriteIndex, 1);
      await user.save();
      return res.status(200).json({
        message: "Item removed from favorites",
        data: (await user.populate("favorite")).favorite,
      });
    }

    user.favorite.push(favoriteId);

    await user.save();

    res.status(200).json({
      message: "Favorite added successfully",
      data: (await user.populate("favorite")).favorite,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================  GET CART =======================

export const getCart = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const user = await User.findById(id).populate("cart");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export const addCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    let cartIds = req.body.itemId; // Accept an array of cartIds

    if (!Array.isArray(cartIds)) {
      cartIds = [cartIds]; // Convert single itemId to array
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const cartId of cartIds) {
      const cartIndex = user.cart.indexOf(cartId);
      if (cartIndex !== -1) {
        user.cart.splice(cartIndex, 1);
      } else {
        user.cart.push(cartId);
      }
    }

    await user.save();

    res.status(200).json({
      message: "Cart updated successfully",
      data: (await user.populate("cart")).cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// ================  REMOVE CART =======================

export const removeCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const cartId = req.body.itemId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    user.cart = user.cart.filter((item) => item.toString() !== cartId);

    await user.save();

    res.status(200).json({
      message: "Item removed successfully",
      data: (await user.populate("cart")).cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================  GET PURCHASE =======================

export const getPurchase = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;

    const user = await User.findById(id).populate("purchase");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.purchase);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================  ADD CART =======================

export const addPurchase = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const purchaseIds = req.body.itemIds; // Assuming you're receiving an array of itemIds
    console.log(purchaseIds);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Concatenate the new purchaseIds with existing ones
    user.purchase = [...user.purchase, ...purchaseIds];
    user.cart = [];

    await user.save();

    res
      .status(200)
      .json({ message: "Purchases added successfully", data: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addPreferences = async (req: Request, res: Response) => {
  try {
    const { userId, preferences } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newUserPreferences = new Set([...user.preferences, ...preferences]);

    user.preferences = [...newUserPreferences];
    await user.save();

    res.status(200).json({ message: "Preferences added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
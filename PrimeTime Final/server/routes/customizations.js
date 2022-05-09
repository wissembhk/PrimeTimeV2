import express from "express";
const router = express.Router();
import Customization from "../models/customization.js";

import cors from "cors";

router.use(cors());

router.get("/", async (req, res) => {
  try {
    const customizations = await Customization.find();
    res.json(customizations);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const customizations = new Customization({
    type: req.body.type,
    violonBody: req.body.violonBody,
    violonStick: req.body.violonStick,
    violonChincrest: req.body.violonChincrest,
    user: req.body.user,
  });

  try {
    const c1 = await customizations.save();
    res.json(c1);
  } catch (err) {
    res.send("Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customization = await Customization.findByIdAndDelete(req.params.id);
    res.json(customization);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id);
    if (req.body.violonBody) customization.violonBody = req.body.violonBody;
    if (req.body.violonChincrest)
      customization.violonChincrest = req.body.violonChincrest;
    if (req.body.violonStick) customization.violonStick = req.body.violonStick;

    await customization.save();
    res.json(customization);
  } catch (err) {
    res.send("Error " + err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const customization = await Customization.findById(req.params.id);
    res.json(customization);
  } catch (err) {
    res.send("Error " + err);
  }
});

export default router;

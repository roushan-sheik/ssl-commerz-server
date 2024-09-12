import { RequestHandler } from "express";

const ipnController: RequestHandler = async (req, res) => {
  console.log("request body from ipn server: ", req.body);
  res.send("hi");
  try {
  } catch (error) {
    console.log(error);
  }
};
export { ipnController };

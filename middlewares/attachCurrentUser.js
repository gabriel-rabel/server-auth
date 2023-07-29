import UserModel from "../model/user.model.js";

export default async function attachCurrentUser(req, res, next) {
   try {
      const userData = req.auth;

      const user = await UserModel.findOne({ _id: userData._id }).select(
         "-passwordHash"
      );

      if (!user) {
         throw new Error("Usuario não encontrado.");
      }

      req.currentUser = user;

      next();
   } catch (err) {
      console.log(err);
      return res.status(500).json(err);
   }
}

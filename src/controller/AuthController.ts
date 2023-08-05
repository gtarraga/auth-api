import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    
    if (!(email && password)) {
      res.status(400).send();
      return;
    }

    //Get user from database
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneBy({ email });
    } catch (error) {
      res.status(401).send();
      return;
    }

    // The hashing has been disabled for this test version to make easier creating the initial user.
    //Check if encrypted password match
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send();
    //   return;
    // }

    //Sign JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.set("Authorization", `Bearer ${token}`)
    res.status(200).send(`${token} Login successful!`);
  };
}
export default AuthController;
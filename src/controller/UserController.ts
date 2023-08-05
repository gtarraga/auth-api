import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    static listAll = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User);
        
        return response.json(await userRepository.find());
    }

    static getOne = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User)
        const email = request.params.email

        const user = await userRepository.findOneBy({ email })
        
        if (!user) {
            response.status(404).send("This user not exist");
            return;
        }
        return response.json(user);
    }

    static newUser = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User)
        // Get params from the body
        const { email, firstName, password } = request.body;
        

        // Check if theres any error with the params
        if(!(email && password && firstName)) {
            response.status(400).send("There's an error with the parameters sent");
            return;
        }
        
        
        const user = Object.assign(new User(), {
            email,
            firstName,
            password
        })

        // Validate if the params are ok
        const errors = await validate(user);
        if(errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        // Hash the pw to store securely
        user.hashPassword();

        // Try to save if it fails the profile already exists
        try {
            await userRepository.save(user);
        } catch (e) {
            response.status(409).send("This profile already exists");
            return;
        }

        // Send 201 if all is ok
        response.status(201).send("User created");
    }

    static editUser = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User)
        //Get the ID from the url
        const id = request.params.id;

        const { email, firstName } = request.body;

        // Find user on the DB
        let user;
        try{
            user = await userRepository.findOneBy({ id })
        } catch (e) {
            response.status(404).send("User not found");
            return;
        }


        // Validate new information, use existing values if undefined
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        const errors = await validate(user);
        if(errors.length > 0) {
            response.status(400).send(errors);
            return;
        }

        // Try to save, if it fails, email is already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            response.status(409).send("Email already in use");
            return;
        }

        response.status(204).send();

    }


    static deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = AppDataSource.getRepository(User)
        const email = request.params.email

        let userToRemove = await userRepository.findOneBy({ email })

        if (!userToRemove) {
            response.status(404).send("User not found");
            return;
        }

        await userRepository.remove(userToRemove)

        return response.status(204).send("User has been removed")
    }

}
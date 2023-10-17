import { createUser, getUsersByEmail } from "db/users";
import express from "express"
import { random } from "helpers";
import { authentication } from '../helpers/index';


export const register = async (reg: express.Request, res: express.Response) => {


    try {

        const { email, username, password } = reg.body

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUsersByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);

        }


        const salt = random();
        const user = await createUser({
            email, username, password, authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end();

    } catch (error) {

        console.log(error);
        return res.sendStatus(400);

    }
}
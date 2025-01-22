import jwt from "jsonwebtoken";

export const decodeJwtToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        return {
            ...decoded as object,
            error: null
        };
    } catch (error) {
        console.log(error);
        return {
            id: null,
            email: null,
            error: 'Unauthorized or token expired'
        }
    }

}
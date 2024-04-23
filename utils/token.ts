import * as jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY as string;

interface Payload {
  email: string;
  password: string;
}

const tokenize = async (payload: Payload): Promise<string> => {
    const token = await jwt.sign(payload, secretKey);
    return token;
}

export default tokenize;
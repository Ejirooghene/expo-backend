import bcrypt, { genSalt, genSaltSync } from "bcrypt";

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Function to verify a password against a stored hash
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

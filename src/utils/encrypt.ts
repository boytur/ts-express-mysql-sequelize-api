import bcrypt from 'bcrypt';

// Number of rounds for salt generation (higher values are more secure but slower)
const saltRounds = 10;

/**
 * Hashes a plain text password.
 * @param plainTextPassword - The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (plainTextPassword: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compares a plain text password with a hashed password.
 * @param plainTextPassword - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare with.
 * @returns A promise that resolves to true if the passwords match, otherwise false.
 */
export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

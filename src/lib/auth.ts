import { compare, hash } from "bcrypt"

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return hash(password, saltRounds)
}

/**
 * Compare a password with a hashed password
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword)
}

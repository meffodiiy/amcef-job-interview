import * as process from 'process'

export const BCRYPT_COST_FACTOR = 10
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_TOKEN_LIFETIME = 60 * 60 * 1000 // in milliseconds

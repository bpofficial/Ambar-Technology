// Error for unprovided token. Public access only.
export const ERR_NO_TOKEN: Error = new Error("No token provided.");

// Error for no 'id' in token payload.
export const ERR_TOKEN_EMPTY: Error = new Error("Token is empty.");

// Error for attempting to login while already logged in. Stops token duping/generating.
export const ERR_LOGGED_IN: Error = new Error("Already logged in.");

export const ERR_USR_NOT_FOUND = (ID: string): Error => { return new Error(`User with identifier ${ID} not found`) }

export const ERR_UNAUTHORISED: Error = new Error("Unauthorised to perform this action.")

export const ERR_INVALID_DETAILS: Error = new Error("Invalid details provided.")
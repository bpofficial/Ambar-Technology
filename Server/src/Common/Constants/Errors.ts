// Error for unprovided token. Public access only.
export const ERR_NO_TOKEN: Error = new Error("No token provided.");

// Error for no 'id' in token payload.
export const ERR_TOKEN_EMPTY: Error = new Error("Token is empty.");

// Error for attempting to login while already logged in. Stops token duping/generating.
export const ERR_LOGGED_IN: Error = new Error("Already logged in.");

// Error for attempting to access user that doesnt exist.
export const ERR_USR_NOT_FOUND: (ID: string) => Error = (ID: string): Error => { return new Error(`User with identifier '${ID}' not found.`) }

// Error for attempting to access restricted resource without authorisation.
export const ERR_UNAUTHORISED: Error = new Error("Unauthorised to perform this action.")

// Error for attempting an action with incorrect authorisation details.
export const ERR_INVALID_DETAILS: Error = new Error("Invalid details provided.")

// Error for attempting to access a resource and nothing was found.
export const ERR_NOTHING_FOUND: Error = new Error("Nothing found.")

// Error for attempting to use an email (unique) that is occupied already.
export const ERR_EMAIL_TAKEN: Error = new Error("Email has been taken.")
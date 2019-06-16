import {
    LOGGED_IN_ADMIN,
    LOGGED_IN_USER,
    PUBLIC,
    HIDDEN
} from "../../Common/Constants/index";
import { AuthChecker } from "type-graphql";
import { Context } from "apollo-server-core";

const auth: AuthChecker<Context> = ({ root, args, context, info }: any, role): boolean => {
    switch (role[0]) {
        case LOGGED_IN_USER:
            // If there's a user currently logged in (in context = verified) then return true.
            if ('email' in context) {
                return true;
            }
            return false;
        case LOGGED_IN_ADMIN:
            // Check the user is an admin (_perm = 'all'), return true, else false.
            if ('_perm' in context && typeof context._perm == "string" && context._perm == 'all') {
                return true;
            }
            return false;
        case HIDDEN:
            // Disable viewing of this field completely.
            return false;
        case PUBLIC:
            // Publically veiwable field.
            return true;
        default:
            console.log('defaulting')
            // Default to true otherwise.
            return true;
    }
}

export default auth;
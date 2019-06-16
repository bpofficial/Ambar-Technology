// Only logged in account owners have access to these fields.
export const LOGGED_IN_USER = "loggedInUser";

// Only logged in Admins have access to these fields.
export const LOGGED_IN_ADMIN = "loggedInAdmin";

// No role or user can view this field.
export const HIDDEN = "notAccessibleByAnyone";

// This field can be viewed by anyone.
export const PUBLIC = "accessibleByAnyone";

export const UNKNOWN = "probablySomeoneWhoIsntAuthenticated"

// All find, edit or remove instances are accessible by admins or ordinaries.
export const READ = 'readFromSomeObject'
export const WRITE = 'writeToSomeObject'

export const PERM = {
    post: {
        canEdit: "canEditThePost",
        canCreate: "canCreateThePost",
        canDelete: "canDeleteThePost"
    },
    user: {
        canEdit: "canEditTheUser",
        canCreate: "canCreateTheUser",
        canDelete: "canDeleteTheUser"
    },
    product: {
        canEdit: "canEditTheProduct",
        canCreate: "canCreateTheProduct",
        canDelete: "canDeleteTheProduct"
    }
}

export interface Permission {
    canEdit?: Boolean | String[];
    canCreate?: Boolean;
    canDestroy?: Boolean | String[];
}
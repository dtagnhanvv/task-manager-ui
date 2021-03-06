(function () {
    "use strict";

    angular.module("biddy.core.language")
        .constant("LOCALE_EN", {
            "LOGIN": "Log in",
            "LOGOUT": "Log Out",
            "EDIT_PROFILE": "Edit Profile",
            "RETURN_TO_ADMIN": "Return to admin account",
            "RETURN_TO_ACCOUNT": "Return to account account",
            "PASSWORD": "Password",
            "USERNAME": "Username",
            "FORGOT_PASSWORD": "Forgot your password?",
            "CANCEL": "Cancel",
            "NO_CANCEL": "No, cancel",
            "YES_CANCEL": "Yes, cancel",
            "OK_CANCEL": "Ok, cancel",
            "YES_DELETE": "Yes, delete",
            "YES_SUBMIT": "Yes, submit",
            "SUBMIT": "Submit",
            "VALID_FORM": "Submit button will be active only when all fields are valid.",
            "ACTIONS": "Actions",
            "CLOSE": "Close",
            "ALERTS": "Alerts",
            "EXPORT_EXCEL": "Export Excel",

            "NAME": "Name",
            "ACCOUNTS": "Accounts",
            "ACCOUNT": "Account",
            "VIDEO_ACCOUNT": "Video Account",
            "VIDEO_ACCOUNTS": "Video Accounts",
            "SUB_ACCOUNT": "Sub Account",
            "REFRESH": 'Refresh',
            "SEARCH": 'Search',
            "RECORDS_FOUND": 'records found',
            "EVENT_LISTENER": {
                "LOGIN_FAIL": "Login failed, did you provide an invalid username and/or password?",
                "LOGOUT_SUCCESS": "You are now logged out",
                "SESSION_EXPIRED": "You are not authenticated. This could mean your session expired, please log in again"
            },
            "BIDDER":"Bidder",
            "TENDER":"Tender",
            "ADMIN":"Admin",
            "NAVBAR": {
                "DASHBOARD": "Dashboard",
                "ACCOUNT_MANAGEMENT": "Account Management",
                "SALE_MANAGEMENT": "Sale Management",
                "ACCOUNTS": "Accounts",
                "SALES": "Sales",
                "NEW_ACCOUNT": "New Account",
                "NEW_SALE": "New Sale",
                "OVERVIEW" : "Overview",
                "TOP_POSTS": "Top Posts",
                "TOP_BIDDINGS": "Top Biddings",
                "TOP_SELLERS": "Top Sellers",
                "TOP_BUYERS": "Top Buyers",
            },
            "ACCOUNT_MODULE": {
                "PASSWORD": "Password",
                "USERNAME": "Username",
                "REPEAT_PASSWORD": "Repeat Password",
                "COMPANY": "Company",
                "EMAIL": "Email",
                "EMAIL_FOR_ALERT": "Emails For Alert",
                "ADD_EMAIL_FOR_ALERT": "Add",
                "FIRST_NAME": "First Name",
                "LAST_NAME": "Last Name",
                "PHONE": "Phone",
                "USER_TYPE": "User type",
                "ADDRESS": "Address",
                "POSTAL_CODE": "Postal Code",
                "CITY": "City",
                "STATE": "State",
                "TAG_DOMAIN": "Tag Domain",
                "COUNTRY": "Country",
                "ENABLED": "Enabled",
                "MODULES" : "Modules",

                "ADD_NEW_SUCCESS": "The account has been created",
                "UPDATE_SUCCESS": "The account has been updated",
                "UPDATE_PROFILE_SUCCESS": "Your profile has been updated successfully",
                "UPDATE_STATUS_FAIL": "Could not change account status",
                "PAUSE_STATUS_SUCCESS": "The account has been deactivated",
                "ACTIVE_STATUS_SUCCESS": "The account has been activated",

                "BACK_TO_ACCOUNT_LIST": "Back to Account List",
                "SELECT_A_ACCOUNT": "Select a account",
                "NEW_ACCOUNT": "New Account",
                "LOGIN_AS_THIS_ACCOUNT": "Login as this account",
                "LAST_LOGIN": "Last Login",
                "STATUS": "Status",
                "EDIT_ACCOUNT": "Edit Account",
                "EDIT_SUB_ACCOUNT": "Edit Sub Account",
                "DEACTIVATE_ACCOUNT": "Deactivate Account",
                "ACTIVATE_ACCOUNT": "Activate Account",
                "HELP_BLOCK_REPEAT_PASSWORD": "Leave it blank for no change",
                "PASSWORD_NOT_SAME": "Passsword is not same",
            },
            "SALE_MODULE": {
                "PASSWORD": "Password",
                "USERNAME": "Username",
                "REPEAT_PASSWORD": "Repeat Password",
                "COMPANY": "Company",
                "EMAIL": "Email",
                "EMAIL_FOR_ALERT": "Emails For Alert",
                "ADD_EMAIL_FOR_ALERT": "Add",
                "FIRST_NAME": "First Name",
                "LAST_NAME": "Last Name",
                "PHONE": "Phone",
                "USER_TYPE": "User type",
                "ADDRESS": "Address",
                "POSTAL_CODE": "Postal Code",
                "CITY": "City",
                "STATE": "State",
                "TAG_DOMAIN": "Tag Domain",
                "COUNTRY": "Country",
                "ENABLED": "Enabled",
                "MODULES" : "Modules",
                
                "ADD_NEW_SUCCESS": "The account has been created",
                "UPDATE_SUCCESS": "The account has been updated",
                "UPDATE_PROFILE_SUCCESS": "Your profile has been updated successfully",
                "UPDATE_STATUS_FAIL": "Could not change account status",
                "PAUSE_STATUS_SUCCESS": "The account has been deactivated",
                "ACTIVE_STATUS_SUCCESS": "The account has been activated",

                "BACK_TO_SALE_LIST": "Back to Sale List",
                "SELECT_A_SALE": "Select a account",
                "NEW_SALE": "New Sale",
                "LOGIN_AS_THIS_SALE": "Login as this account",
                "LAST_LOGIN": "Last Login",
                "STATUS": "Status",
                "EDIT_SALE": "Edit Sale",
                "EDIT_SUB_SALE": "Edit Sub Sale",
                "DEACTIVATE_SALE": "Deactivate Sale",
                "ACTIVATE_SALE": "Activate Sale",
                "HELP_BLOCK_REPEAT_PASSWORD": "Leave it blank for no change",
                "PASSWORD_NOT_SAME": "Passsword is not same",
            },
            "ERROR_PAGE": {
                "400": "An invalid request was sent to the server",
                "403": "You do not have the required permissions to access this",
                "404": "The requested resource could not be found",
                "500": "An error occurred"
            },
            "RESET_PASSWORD_MODULE": {
                "RESET": "Reset",
                "USERNAME_EMAIL": "Username or email",
                "NEW_PASSWORD": "New password",
                "REPEAT_PASSWORD": "Repeat password",
                "RESET_PASSWORD": "Reset password",

                "SEND_EMAIL_SUCCESS": "An email has been sent to '{{ username }}'. It contains a link you must click to reset your password",
                "SEND_EMAIL_FAIL": "Could not reset password for '{{ username }}'",
                "RESET_SUCCESS": "Change successful, login to continue",
                "TOKEN_NOT_EXISTED": "The token '{{ token }}' does not exist",
                "TOKEN_EXPIRED": "The token '{{ token }}' is expired. Please try to reset password again",
                "INTERNAL_ERROR": "Internal error. Please contact administrator for further instructions",
                "HELP_BLOCK_CHECK_EMAIL": "Enter your username or email address that you used to register. We'll send you an email with your username and a link to reset your password."
            },
            "QUERY_BUILDER": {
                "ADD_RULE": "Add Rule",
                "RULE": "Rule",
                "SHOW_GENERATED_EXPRESSION": "Show generated rule",
                "ENABLE_DRAG_DROP": "Enable Drag/Drop",
                "STARTING_POSITION": "Starting Position",
                "SELECT_A_POSITION": "Select a position",
                "ADD_CONDITION": "Add Condition",
                "ADD_GROUP": "Add Group",
                "RULE_NAME": "Rule name",
                "HELP_BLOCK_STARTING_POSITION": "Default position is the position of first ad tag found in this ad slot"
            }
        });
})();
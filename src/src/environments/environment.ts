// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const protocolAndDomain: string = "http://localhost:7005";

export const environment = {
  production: false,
  authTokenKey: "authToken",
  authTokenHeaderKey: "Authorization",
  apiRoutes: {
    identity: {
      signUp: protocolAndDomain + "/api/identity/v1/authentication/signup",
      login: protocolAndDomain + "/api/identity/v1/authentication/login",
      getResetToken: protocolAndDomain + "/api/identity/v1/authentication/requestresetpwd",
      changePassword: protocolAndDomain + "/api/identity/v1/authentication/resetpwd",
      authorizeUser: protocolAndDomain + "/api/identity/v1/authorize/user"
    },
    garden: {
      garden: protocolAndDomain + "/api/garden/v1/gardens",
      gardenList: protocolAndDomain + "/api/garden/v1/gardens/list"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

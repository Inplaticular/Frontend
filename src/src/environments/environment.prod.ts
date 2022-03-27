const identityProtocolAndDomain: string = "http://localhost:7005";
const gardenProtocolAndDomain: string = "http://localhost:7005";

export const environment = {
  production: true,
  authTokenKey: "authToken",
  authTokenHeaderKey: "Authorization",
  apiRoutes: {
    identity: {
      signUp: identityProtocolAndDomain + "/api/identity/v1/authentication/signup",
      login: identityProtocolAndDomain + "/api/identity/v1/authentication/login",
      getResetToken: identityProtocolAndDomain + "/api/identity/v1/authentication/requestresetpwd",
      changePassword: identityProtocolAndDomain + "/api/identity/v1/authentication/resetpwd",
      authorizeUser: identityProtocolAndDomain + "/api/identity/v1/authorize/user",
      informationUserById: identityProtocolAndDomain + "/api/identity/v1/information/authentication/user",
      informationUsersByNameOrEmail: identityProtocolAndDomain + "/api/identity/v1/information/authentication/users",
    },
    garden: {
      gardenList: gardenProtocolAndDomain + "/api/garden/v1/gardens/list",
      garden: gardenProtocolAndDomain + "/api/garden/v1/gardens",
      plants: gardenProtocolAndDomain + "/api/garden/v1/plants",
      plantData: gardenProtocolAndDomain + "/api/garden/v1/plants/plant_data",
      gardenPermissions: gardenProtocolAndDomain + "/api/garden/v1/gardens/permissions",
      gardenRoles: gardenProtocolAndDomain + "/api/garden/v1/gardens/permissions/roles"
    }
  }
};

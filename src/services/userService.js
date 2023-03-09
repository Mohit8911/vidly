import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register
}

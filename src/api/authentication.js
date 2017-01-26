import request from "superagent";
import config from "../config";

export function login (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'auth/login/')
      .send(payload)
      .end(function (err, res) {
        //  If auth token is not returned, that means the user entered bad credentials.
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}


export function loginFacebook (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'auth/login/facebook')
      .send({
        access_token: payload.authResponse.accessToken,
        facebook_id: payload.authResponse.userID,
        email: payload.user.email,
        photo_url: payload.user.picture.data.url,
        name: payload.user.name
      })
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

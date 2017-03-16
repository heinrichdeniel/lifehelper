import request from "superagent";
import config from "../config";

export function login (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'user/login/')
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

export function registration (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'user/registration/')
      .send(payload)
      .end(function (err, res) {
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
      .post(config.api.host + 'user/login/facebook')
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

export function loginGoogle (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'user/login/google')
      .send({
        access_token: payload.Zi.access_token,
        google_id: payload.El,
        email: payload.w3.U3,
        photo_url: payload.w3.Paa+"?sz=500",
        name: payload.w3.ig
      })
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function getProfile (payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'user/profile')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function updateGeneralSettings (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'user/updateGeneralSettings')
      .set('x-access-token', payload.token)
      .send(payload.settings)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

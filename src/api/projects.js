import request from "superagent";
import config from "../config";

export function createProject(payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/')
      .send(payload)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function getProjectList (payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'projects/')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function deleteProject (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/delete/'+payload.id)
      .set('x-access-token', payload.token)
      .send({id: payload.id})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

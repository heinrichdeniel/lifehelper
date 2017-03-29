import request from "superagent";
import config from "../config";

export function createTask (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'tasks/')
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

export function getTaskList (payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'tasks/')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}


export function getArchive(payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'tasks/archive/')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function getTaskById (payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'tasks/'+payload.id)
      .set('x-access-token', payload.token)
      .query({id: payload.id})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function deleteTask (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'tasks/delete/'+payload.id)
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

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

export function shareProject (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/share')
      .set('x-access-token', payload.token)
      .send({users: payload.users, project: payload.project})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function acceptShare (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/acceptShare')
      .set('x-access-token', payload.token)
      .send({projectId: payload.projectId})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function declineShare (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/declineShare')
      .set('x-access-token', payload.token)
      .send({projectId: payload.projectId})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}


export function removeShare (payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'projects/removeShare')
      .set('x-access-token', payload.token)
      .send(payload.data)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

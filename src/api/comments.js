import request from "superagent";
import config from "../config";

export function sendComment(payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'comments')
      .set('x-access-token', payload.token)
      .send({taskId:payload.task, projectId: payload.project, text: payload.comment})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function getComments(payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'comments')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function getTasksAndProjects(payload) {
  return new Promise((resolve, reject) => {
    request
      .get(config.api.host + 'comments/getTasksAndProjects')
      .set('x-access-token', payload.token)
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

export function clearNewComment(payload) {
  return new Promise((resolve, reject) => {
    request
      .post(config.api.host + 'comments/clearNewComment')
      .set('x-access-token', payload.token)
      .send({task: payload.task, project: payload.project})
      .end(function (err, res) {
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

import request from "superagent";

export function login (credentials) {
  return new Promise((resolve, reject) => {
    request
      .post('http://localhost:8080/auth/login/')
      .send(credentials)
      .end(function (err, res) {
        //  If auth token is not returned, that means the user entered bad credentials.
        if (!res.body.success) {
          reject(res.body);
        }
        resolve(res.body);
      })
  })
}

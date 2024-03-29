const request = require('supertest');
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';
import { expect } from 'chai';

const app = createServer();
let token: string;
let id: string;
const email = 'test1@gmail.com';
const password = '12345';

describe('Auth API checks', () => {
  let server: any;

  before((done) => {
    server = app.listen(5000, done);
  });
  afterEach(function (done) {
    server.close();
    done();
  });
  it('Check register user', (done) => {
    request(app)
      .post(`/${API}/user/register`)
      .send({
        email: email,
        password: password,
        first_name: 'Miftahul',
        last_name: 'Arifin'
      })
      .expect(200, done);
  });
  it('Check login user', (done) => {
    request(app)
      .post(`/${API}/auth/login`)
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .then((response: any) => {
        token = response.body.payload.token;
        done();
      });
  });
  it('Check auth information', (done) => {
    if (!token) {
      expect(token).to.be.not.undefined;
      done();
    }
    request(app)
      .get(`/${API}/auth`)
      .set('authorization', token)
      .expect(200)
      .then((response: any) => {
        id = response.body.payload.id;
        done();
      });
  });
  it('Check remove account', (done) => {
    if (!id) {
      expect(id).to.be.not.undefined;
      done();
    }
    request(app)
      .put(`/${API}/user/remove`)
      .set('x-authorization', token)
      .send({
        id: id
      })
      .expect(200, done);
  });
});

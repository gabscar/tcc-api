const request = require('supertest');
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';
import { expect } from 'chai';
import { loginRepository } from '../../../src/api/repositories';
const sinon = require('sinon');
const app = createServer();
let token: string;
let id: string;
let user_id: string;
const email = 'test1@gmail.com';
const password = '12345';
// const faker = require('faker');
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
  it('Could not register user if is alread been registred', (done) => {
    request(app)
      .post(`/${API}/user/register`)
      .send({
        email: email,
        password: password,
        first_name: 'Miftahul',
        last_name: 'Arifin'
      })
      .expect(400, done);
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
        console.log(response);
        id = response.body.payload.id;
        user_id = response.body.payload.user_id;
        done();
      });
  });
  it('Check remove account', (done) => {
    if (!id) {
      expect(id).to.be.not.undefined;
      done();
    }
    if (!token) {
      expect(token).to.be.not.undefined;
      done();
    }
    request(app)
      .put(`/${API}/user/remove`)
      .set('authorization', token)
      .send({
        id: id
      })
      .expect(200, done);
  });
  it('Activate User Acount if is inactivated', (done) => {
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
  it('not Activate User Acount if is inactivated', (done) => {
    sinon
      .stub(loginRepository, 'isEmailExist')
      .returns({ id, user_id, is_active: false });
    const stub = sinon.stub(loginRepository, 'update').returns(void 0);
    loginRepository.update({
      updateWhere: [{ column: 'id', value: id }],
      newData: { is_active: true }
    });
    request(app)
      .post(`/${API}/user/register`)
      .send({
        email: email,
        password: password,
        first_name: 'Miftahul',
        last_name: 'Arifin'
      })
      .expect(400, done);
    expect(stub.calledOnce).to.be.true;
  });
});

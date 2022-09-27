const request = require('supertest');
import { createServer } from '../../../../src/server';
import { API } from '../../../../src/constants';
const fs = require('fs');
const app = createServer();

describe('upload API checks', () => {
  let server: any;

  before((done) => {
    server = app.listen(5000, done);
  });
  afterEach(function (done) {
    server.close();
    done();
  });
  it('upload new image', (done) => {
    const file = fs.readFileSync(`${__dirname}/imagem1.jpg`);
    request(app)
      .post(`/${API}/upload/radiography`)
      .set('content-type', 'multipart/form-data')
      .attach('file', file, 'tests/imagem1.png')
      .expect(200, done);
  });

  it('not upload new image if file not sent', (done) => {
    request(app).post(`/${API}/upload/radiography`).expect(409, done);
  });
  it('not upload new image if file is not valid', (done) => {
    request(app)
      .post(`/${API}/upload/radiography`)
      .set('content-type', 'multipart/form-data')
      .attach('file', '', 'tests/imagem1.png')
      .expect(500, done);
  });
});

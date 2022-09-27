const request = require('supertest');
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';
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
  it('detect image', (done) => {
    request(app).get(`/${API}/image/detect/imagem1.jpg`).expect(200, done);
  });

  it('not detect image if file not exist', (done) => {
    request(app).get(`/${API}/image/detect/imagem3.jpg`).expect(403, done);
  });
});

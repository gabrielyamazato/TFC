import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import mockedById from '../tests/mocks/teamById.mock'
import mockedTeams from '../tests/mocks/teams.mock';

import Login from '../Interfaces/Login';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de backend', () => {
  describe('Teams', function () {
    it('Testa se retorna todos os times', async function () {
      const response = await chai.request(app).get('/teams');
  
      expect(response.status).to.equal(200);
      expect(response.body).to.be.deep.equal(mockedTeams);
    });

    it('Testa se retorna o time correto na busca por Id', async function () {
      const resp = await chai.request(app).get('/teams/5');

      expect(resp.status).to.equal(200);
      expect(resp.body).to.be.deep.equal(mockedById);
    })
  });

  describe('Users', function () {
    const route = '/login'
    it('Testa se o usuário consegue realizar o login', async function () {
      const loginData: Login = {
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      }

      const response = await chai.request(app)
        .post(route)
        .send(loginData)

      expect(response).to.have.status(201);
    })
  })
});

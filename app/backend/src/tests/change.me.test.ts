import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/Users.model';
import mockedById from '../tests/mocks/teamById.mock'
import mockedTeams from '../tests/mocks/teams.mock';
import mockedMatches from '../tests/mocks/matches.mock';
import mockedFilteredMatches from '../tests/mocks/matchesFiltered.mock';

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
    afterEach(function () {
      sinon.restore();
    })

    const route = '/login'
    
    it('Testa se o usuário consegue realizar o login e o token é gerado', async function () {
      const loginData: Login = {
        email: 'user@user.com',
        password: 'secret_user'
      }   

      const response = await chai.request(app)
        .post(route)
        .send(loginData)

      expect(response).to.have.status(200);
      expect(response.body).to.have.ownProperty('token');
    })

    it('Testa se retorna o erro http 401 caso seja passado um email invalido', async function () {
      const wrongLoginData: Login = {
        email: 'xablau@user.com',
        password: 'secret_user'
      }

      const resp = await chai.request(app)
        .post(route)
        .send(wrongLoginData)

      expect(resp).to.have.status(401);
      expect(resp.body).to.be.deep.equal({ "message": "Invalid email or password" })
    })

    it('Testa se retorna o erro http 400 caso não seja informado um dos campos', async function () {
      const wrongLoginData: Login = {
        email: '',
        password: 'secret_user'
      }

      const resp = await chai.request(app)
        .post(route)
        .send(wrongLoginData)

      expect(resp).to.have.status(400);
      expect(resp.body).to.be.deep.equal({ "message": "All fields must be filled" })
    })

    it('Testa a rota get de /login e se retorna a role corretamente', async function () {
      sinon.stub(jwt, 'verify').returns();

      const Token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5OTcxNjQ4fQ.OAVLeQp2pg3x0rah-eq2kkrQpFEYjSM6LNUH5EEQJsM`
      
      const request = await chai.request(app)
        .get('/login/role')
        .set('authorization', Token)

      expect(request).to.have.status(200);
      expect(request.body).to.be.deep.equal({ "role": "admin" });
    })

    it('Testa o erro caso não seja enviado um token', async function () {
      const Token = '';
      
      const request = await chai.request(app)
        .get('/login/role')
        .set('authorization', Token)

      expect(request).to.have.status(401);
      expect(request.body).to.be.deep.equal({ "message": "Token not found" });
    })
  })

  describe('Matches', function () {
    it('Testa se feito a requisição retorna todas as partidas', async function () {
      const request = await chai.request(app)
        .get('/matches')

      expect(request).to.have.status(200);
      expect(request.body).to.be.deep.equal(mockedMatches);
    })
    it('Testa se feito a requisição com filtro na url retorna todas as partidas válidas', async function () {
      const request = await chai.request(app)
        .get('/matches?inProgress=false')

      expect(request).to.have.status(200);
      expect(request.body).to.be.deep.equal(mockedFilteredMatches);
    })
  })
});

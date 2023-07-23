import { Router } from 'express';
import getTeams from '../controllers/teams.controllers';
import LoginController from '../controllers/login.controller';
import MatchesController from '../controllers/matches.controller';
import authLoginMiddleware from '../middlewares/authLogin.middleware';
import AuthTokenMiddleware from '../middlewares/authToken.middleware';

const loginController = new LoginController();

const router = Router();

router.get('/teams', getTeams.getAllTeams);
router.get('/teams/:id', getTeams.getTeamById);
router.post(
  '/login',
  authLoginMiddleware.validateFieldsLogin,
  (req, res) => loginController.login(req, res),
);
router.get(
  '/login/role',
  AuthTokenMiddleware.validateToken,
  (req, res) => loginController.getRole(req, res),
);
router.get('/matches', MatchesController.getAllMatches);

export default router;

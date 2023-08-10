import { Router } from 'express';
import getTeams from '../controllers/teams.controllers';
import LoginController from '../controllers/login.controller';
import MatchesController from '../controllers/matches.controller';
import LeaderboardController from '../controllers/leaderboard.controller';
import authLoginMiddleware from '../middlewares/authLogin.middleware';
import AuthTokenMiddleware from '../middlewares/authToken.middleware';

const loginController = new LoginController();
const leaderboardController = new LeaderboardController();

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
router.post('/matches', AuthTokenMiddleware.validateToken, MatchesController.createNewMatch);
router.patch(
  '/matches/:id',
  AuthTokenMiddleware.validateToken,
  MatchesController.updateMatch,
);
router.patch(
  '/matches/:id/finish',
  AuthTokenMiddleware.validateToken,
  MatchesController.finishMatch,
);
router.get('/leaderboard/home', (req, res) => leaderboardController.getLeaderboard(req, res));

export default router;

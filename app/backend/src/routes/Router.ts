import { Router } from 'express';
import getTeams from '../controllers/teams.controllers';
import loginController from '../controllers/login.controller';
import authLoginMiddleware from '../middlewares/authLogin.middleware';

const LoginController = new loginController();

const router = Router();

router.get('/teams', getTeams.getAllTeams);
router.get('/teams/:id', getTeams.getTeamById);
router.post(
  '/login',
  authLoginMiddleware.validateFieldsLogin,
  (req, res) => LoginController.login(req, res),
);

export default router;

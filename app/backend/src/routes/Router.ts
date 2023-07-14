import { Router } from 'express';
import getTeams from '../controllers/teams.controllers';
import loginController from '../controllers/login.controller';

const router = Router();

router.get('/teams', getTeams.getAllTeams);
router.get('/teams/:id', getTeams.getTeamById);
router.post('/login', loginController);

export default router;

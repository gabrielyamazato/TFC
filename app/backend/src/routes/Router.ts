import { Router } from 'express';
import getTeams from '../controllers/teams.controllers';

const router = Router();

router.get('/teams', getTeams.getAllTeams);
router.get('/teams/:id', getTeams.getTeamById);

export default router;

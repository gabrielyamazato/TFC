import { Request, Response } from 'express';
import teams from '../services/teams.services';

async function getAllTeams(_req: Request, res: Response): Promise<Response> {
  const a = await teams.getAllTeams();

  return res.status(200).json(a);
}

async function getTeamById(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const b = await teams.getTeamById(id);

  return res.status(200).json(b);
}

export default { getAllTeams, getTeamById };

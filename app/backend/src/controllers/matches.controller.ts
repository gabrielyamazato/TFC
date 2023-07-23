import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class matchesController {
  static matchesService = new MatchesService();

  static async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matchesResponse = await matchesController.matchesService.getAllMatches();

      if (!matchesResponse) {
        return res.status(404).json({ message: 'Not Found' });
      }

      return res.status(200).json(matchesResponse);
    }
    const myString = inProgress;
    const myBoolean = (myString === 'true');
    const matchesResp = await matchesController.matchesService.filteredMatches(myBoolean);

    return res.status(200).json(matchesResp);
  }
}

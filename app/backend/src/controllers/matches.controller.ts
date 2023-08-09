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

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    const ID = req.params.id;

    await matchesController.matchesService.finishMatch(ID);

    return res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    await matchesController.matchesService.updateGoals(id, data);

    return res.status(200).json({ message: 'Match goals updated!' });
  }

  static async createNewMatch(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const response = await matchesController.matchesService.registerNewMatch(data);

    if (response === 'TEAM_NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (response === 'SAME_TEAM') {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    return res.status(201).json(response);
  }
}

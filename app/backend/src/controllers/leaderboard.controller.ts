import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  static async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.createLeaderBoard();

    return res.status(200).json(leaderboard);
  }
}

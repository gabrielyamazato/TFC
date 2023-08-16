import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.createHomeLeaderboard();

    return res.status(200).json(leaderboard);
  }

  static async getAwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.createAwayLeaderboard();

    return res.status(200).json(leaderboard);
  }

  static async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.createLeaderboard();

    return res.status(200).json(leaderboard);
  }
}

import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardService.createLeaderBoard();

    return res.status(200).json(leaderboard);
  }
}

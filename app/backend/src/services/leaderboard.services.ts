import generateLeaderboard from '../utils/leaderboardFunctions';
import Leaderboard from '../Interfaces/Leaderboard';
import MatchesModel from '../database/models/Matches.model';
import TeamsModel from '../database/models/Teams.model';

export default class LeaderboardService {
  static async finishedMatches() {
    const teams = await TeamsModel.findAll();
    const matches = await MatchesModel.findAll({
      where: { inProgress: false },
    });

    return { teams, matches };
  }

  private static sortLeaderboard(table: Leaderboard[]): Leaderboard[] {
    const sorted = table.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
     || b.totalVictories - a.totalVictories
     || b.goalsBalance - a.goalsBalance
     || b.goalsFavor - a.goalsFavor
     || a.goalsOwn - b.goalsOwn,
    );

    return sorted;
  }

  static async createLeaderBoard(): Promise<Leaderboard[]> {
    const { teams, matches } = await LeaderboardService.finishedMatches();

    const createdLeaderboard = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        ...generateLeaderboard(homeMatches, team.id),
      };
    });

    const sortedLb = LeaderboardService.sortLeaderboard(createdLeaderboard);

    return sortedLb;
  }
}

// comentario para novo commit

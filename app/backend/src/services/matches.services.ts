import Matches from '../Interfaces/Matches';
import Goals from '../Interfaces/Goals';
import MatchesModel from '../database/models/Matches.model';
import Teams from '../database/models/Teams.model';

export default class MatchesService {
  private model = MatchesModel;

  public async getAllMatches(): Promise<object[]> {
    const matches = this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async filteredMatches(payload: boolean): Promise<object[]> {
    const filterMatches = this.model.findAll({
      where:
      {
        inProgress: payload,
      },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return filterMatches;
  }

  public async finishMatch(id: string): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateGoals(id: string, goals: Goals): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async registerNewMatch(match: Matches): Promise<Matches | string> {
    const homeTeamVerify = await this.model.findByPk(match.homeTeamId);
    const awayTeamVerify = await this.model.findByPk(match.awayTeamId);

    if (!homeTeamVerify || !awayTeamVerify) {
      return 'TEAM_NOT_FOUND';
    }

    if (match.homeTeamId === match.awayTeamId) {
      return 'SAME_TEAM';
    }

    const newMatch = await this.model.create({
      ...match,
      inProgress: true,
    });

    return newMatch;
  }
}

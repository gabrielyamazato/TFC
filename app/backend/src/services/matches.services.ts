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
}

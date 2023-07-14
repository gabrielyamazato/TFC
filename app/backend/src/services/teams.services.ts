import TeamsModel from '../database/models/Teams.model';

type Id = string;

async function getAllTeams(): Promise<object[]> {
  const reqAllTeams = await TeamsModel.findAll();

  return reqAllTeams;
}

async function getTeamById(id: Id): Promise<object | null> {
  const reqOneTeam = await TeamsModel.findByPk(id);

  return reqOneTeam;
}

export default { getAllTeams, getTeamById };

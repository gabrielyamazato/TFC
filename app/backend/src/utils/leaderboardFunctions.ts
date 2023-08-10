import Match from '../Interfaces/Matches';

const countWins = (matches: Match[], teamId: number) => {
  const wins = matches.reduce((acc, match) => {
    if (
      match.homeTeamId === teamId
      && match.homeTeamGoals > match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeamId === teamId
      && match.awayTeamGoals > match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return wins;
};

const countDraws = (matches: Match[], teamId: number) => {
  const draws = matches.reduce((acc, match) => {
    if (
      match.homeTeamId === teamId
      && match.homeTeamGoals === match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeamId === teamId
      && match.awayTeamGoals === match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return draws;
};

const countLosses = (matches: Match[], teamId: number) => {
  const losses = matches.reduce((acc, match) => {
    if (
      match.homeTeamId === teamId
      && match.homeTeamGoals < match.awayTeamGoals
    ) {
      return acc + 1;
    }

    if (
      match.awayTeamId === teamId
      && match.awayTeamGoals < match.homeTeamGoals
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return losses;
};

const countPoints = (matches: Match[], teamId: number) => {
  const wins = countWins(matches, teamId);
  const draws = countDraws(matches, teamId);

  const points = (wins * 3) + (draws * 1);

  return points;
};

const countGames = (matches: Match[], teamId: number) => {
  const games = matches.reduce((acc, match) => {
    if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return games;
};

const countFavorGoals = (matches: Match[], teamId: number) => {
  const goalsFavor = matches.reduce((acc, match) => {
    if (match.homeTeamId === teamId) {
      return acc + match.homeTeamGoals;
    }

    if (match.awayTeamId === teamId) {
      return acc + match.awayTeamGoals;
    }

    return acc;
  }, 0);

  return goalsFavor;
};

const countOwnGoals = (matches: Match[], teamId: number) => {
  const goalsOwn = matches.reduce((acc, match) => {
    if (match.homeTeamId === teamId) {
      return acc + match.awayTeamGoals;
    }

    if (match.awayTeamId === teamId) {
      return acc + match.homeTeamGoals;
    }

    return acc;
  }, 0);

  return goalsOwn;
};

const balanceGoals = (matches: Match[], teamId: number) => {
  const favorGoals = countFavorGoals(matches, teamId);
  const ownGoals = countOwnGoals(matches, teamId);

  const balance = favorGoals - ownGoals;

  return balance;
};

const calculateEffciency = (matches: Match[], teamId: number) => {
  const points = countPoints(matches, teamId);
  const games = countGames(matches, teamId);

  const efficiency = (points / (games * 3)) * 100;

  return efficiency.toFixed(2);
};

const generateLeaderboard = (matches: Match[], teamId: number) => ({
  totalPoints: countPoints(matches, teamId),
  totalGames: countGames(matches, teamId),
  totalVictories: countWins(matches, teamId),
  totalDraws: countDraws(matches, teamId),
  totalLosses: countLosses(matches, teamId),
  goalsFavor: countFavorGoals(matches, teamId),
  goalsOwn: countOwnGoals(matches, teamId),
  goalsBalance: balanceGoals(matches, teamId),
  efficiency: calculateEffciency(matches, teamId),
});

export default generateLeaderboard;

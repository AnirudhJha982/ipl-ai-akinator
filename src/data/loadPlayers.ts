import Papa from "papaparse";

export async function loadPlayers() {

  // LOAD PLAYER DATA
  const playerResponse = await fetch("/data/Player.csv");
  const playerText = await playerResponse.text();

  const players: any[] = await new Promise((resolve) => {

    Papa.parse(playerText, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data);
      }
    });

  });

  // LOAD MATCH DATA
  const matchResponse = await fetch("/data/Player_Match.csv");
  const matchText = await matchResponse.text();

  const matches: any[] = await new Promise((resolve) => {

    Papa.parse(matchText, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data);
      }
    });

  });

  // MERGE DATASETS
  const mergedPlayers = players.map((player) => {

    const relatedMatches = matches.filter(
      (m) => m.Player_Id === player.Player_Id
    );

    return {

      ...player,

      Is_Captain: relatedMatches.some(
        (m) => m.Is_Captain === "1"
      ) ? 1 : 0,

      Is_Keeper: relatedMatches.some(
        (m) => m.Is_Keeper === "1"
      ) ? 1 : 0,
    };
  });

  return mergedPlayers;
}
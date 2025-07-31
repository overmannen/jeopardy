import React, { useState } from "react";

type OptionsProps = {
  teamsSubmit: (teams: string[]) => void;
};

export const Options = ({ teamsSubmit }: OptionsProps) => {
  const [teamNamesInput, setTeamNamesInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNamesInput(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const teams = teamNamesInput
      .split(",")
      .map((team) => team.trim())
      .filter((team) => team.length > 0);

    if (teams.length > 0) {
      teamsSubmit(teams);
    }
  };

  return (
    <div className="options-container">
      <label htmlFor="team-names">
        Team Names (single comma between names)
      </label>
      <input
        type="text"
        className="team-names"
        id="team-name"
        value={teamNamesInput}
        onChange={handleInput}
        placeholder="Team 1, Team 2, Team 3"
      />
      <button onClick={handleSubmit} className="submit-teams">
        Ready
      </button>
    </div>
  );
};

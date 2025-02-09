import { ReactNode } from "react";

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  score: string;
  teams: string[];
  captains: {
    team1: {
      name: string;
      image: string;
    };
    team2: {
      name: string;
      image: string;
    };
  };
}

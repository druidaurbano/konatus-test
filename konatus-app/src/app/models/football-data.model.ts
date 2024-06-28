export interface Area {
  id: number;
  name: string;
  countryCode: string;
  ensignUrl: string;
}

export interface Team {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
}

export interface FootballDataResponse {
  count: number;
  teams: Team[];
}

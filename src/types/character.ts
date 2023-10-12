export type CharacterData = {
  name: string;
  url: string;
};

export type CharacterDetailsData = {
  name: string;
  planet: {
    name?: string;
    url: string;
  };
  vehicles: {
    name: string;
    url: string;
  }[];
  race: {
    name?: string;
    url: string;
  }[];
  url: string;
};

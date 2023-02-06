export interface Verse {
  verse: {
    first: string;
    sec: string;
    _id: string;
  };
}

export interface Poet {
  _id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
}

export interface Poem {
  _id: string;
  intro: string;
  poet: string | Poet;
  verses: Verse[];
  reviewed: boolean;
}

export interface ChosenVerse {
  _id: string;
  poet: string | Poet;
  poem: string | Poem;
  tags: string;
  verse: Verse[];
  reviewed: boolean;
}

export interface Prose {
  _id: string;
  poet: string | Poet;
  tags: string;
  qoute: string;
  reviewed: boolean;
}

export interface Print {
  _id: string;
  peot?: string | Poet;
  poem?: string | Poem;
  reviewed: boolean;
  tags?: string;
  verse?: Verse[];
  qoute?: string;
  first?: string;
  sec?: string;
}

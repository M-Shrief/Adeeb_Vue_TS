export interface Verse {
  first: string;
  sec: string;
  _id: string;
}

export interface Poet {
  details: {
    _id: string;
    name: string;
    time_period: string;
    bio: string;
    reviewed: boolean;
  };
  authoredPoems: Poem[];
  authoredChosenVerses: ChosenVerse[];
  authoredProses: Prose[];
}

export interface Poem {
  _id: string;
  intro: string;
  poet: Poet['details'];
  verses: Verse[];
  reviewed: boolean;
}

export interface ChosenVerse {
  _id: string;
  poet: Poet['details'];
  poem: string | Poem;
  tags: string;
  verse: Verse[];
  reviewed: boolean;
}

export interface Prose {
  _id: string;
  poet: Poet['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
}

export interface Print {
  _id: string;
  peot?: string | Poet['details'];
  poem?: string | Poem;
  reviewed: boolean;
  tags?: string;
  verse?: Verse[];
  qoute?: string;
  first?: string;
  sec?: string;
}

export interface Product {
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

export interface Order {
  products: Product[];
  name: string;
  phone: string;
  address: string;
}

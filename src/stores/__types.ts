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
  createdAt: string;
  updatedAt: string;
}

export interface Poem {
  _id: string;
  intro: string;
  poet: Poet['details'];
  verses: Verse[];
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChosenVerse {
  _id: string;
  poet: Poet['details'];
  poem: string | Poem;
  tags: string;
  verse: Verse[];
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Prose {
  _id: string;
  poet: Poet['details'];
  tags: string;
  qoute: string;
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
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
  _id: string;
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

export interface Order {
  _id: string;
  products: Product[];
  name: string;
  phone: string;
  address: string;
  reviewed: boolean;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

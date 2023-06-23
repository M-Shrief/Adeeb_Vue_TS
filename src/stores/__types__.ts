export interface Verse {
  _id: string;
  first: string;
  sec: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface ChosenVerse {
  _id: string;
  poet: Poet['details'];
  poem: string | Poem;
  tags: string;
  verses: Verse[];
  reviewed: boolean;
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
  poem?: string;
  verses?: Verse[];
  qoute?: string;
}

export interface Product {
  _id: string;
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  _id: string;
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

export interface Partner {
  _id: string;
  name: string;
  phone: string;
  address: string;
  password: string;
}

export interface Order {
  _id?: string;
  partner?: string;
  products: Product[] | ProductGroup[];
  name: string;
  phone: string;
  address: string;
  reviewed?: boolean;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

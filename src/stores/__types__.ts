import type {Combine} from '../utils/combineTypes'

export interface Verse {
  _id: string;
  first: string;
  sec: string;
}

export interface Poet {
  _id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
  poems: Poem[];
  chosenVerses: ChosenVerse[];
  proses: Prose[];
  poetry: Poetry[];
}

export interface Poem {
  _id: string;
  intro: string;
  poet: Poet;
  verses: Verse[];
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChosenVerse {
  _id: string;
  poet: Poet;
  poem: string | Poem;
  tags: string;
  verses: Verse[];
  reviewed: boolean;
}

export interface Prose {
  _id: string;
  poet: Poet;
  tags: string;
  qoute: string;
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Poetry extends Combine<ChosenVerse, Prose> {};

export interface Print {
  _id: string;
  poem?: string;
  verses?: Verse[];
  qoute?: string;
}

export interface Product {
  print: Print;
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}
export interface ProductGroup {
  prints: Print[];
  fontType: string;
  fontColor: string;
  backgroundColor: string;
}

export interface Partner {
  _id: string;
  name: string;
  phone: string;
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

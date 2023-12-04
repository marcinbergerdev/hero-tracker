
export type Person = {
   name: string;
   slug: string;
};

export type Quote = {
   character: HouseName;
   sentence: string;
};

export type HouseName = {
  name: string;
  slug: string;
  house: Person;
};

export type House = {
   name: string;
   slug: string;
   members: Person[];
};




export type Character = {
   house: Person;
   name: string;
   quotes: string[];
   slug: string;
};


export type Person = {
   name: string;
   slug: string;
};

export type Quote = {
   character: Character;
   sentence: string;
};

export type House = {
   slug: string;
   name: string;
};

export type Character = {
   house: Person;
   name: string;
   quotes?: string[];
   slug: string;
};

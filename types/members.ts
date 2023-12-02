export type Person = {
   name: string;
   slug: string;
};

export type Members = {
   name: string;
   members: Person[];
};

export type House = {
   slug: string;
   name: string;
};

export type Character = {
   house: House;
   name: string;
   quotes: string[];
   slug: string;
};

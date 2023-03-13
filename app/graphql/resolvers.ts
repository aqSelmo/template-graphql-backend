interface Book {
  title: string;
  author: string;
}

const books: Book[] = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

export const resolvers = {
  Query: {
    books: (): Book[] => books,
  },
};

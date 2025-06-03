// insert_books.js - Script to populate MongoDB with sample book data

const { MongoClient } = require('mongodb');

// Change this URI if using MongoDB Atlas
const uri = 'mongodb://localhost:27017';

const dbName = 'plp_bookstore';
const collectionName = 'books';

const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  },
  {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    genre: 'Historical Fiction',
    published_year: 2005,
    price: 13.99,
    in_stock: true,
    pages: 552,
    publisher: 'Picador'
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Thriller',
    published_year: 2003,
    price: 16.99,
    in_stock: false,
    pages: 489,
    publisher: 'Doubleday'
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: 'Science Fiction',
    published_year: 2008,
    price: 12.00,
    in_stock: true,
    pages: 374,
    publisher: 'Scholastic Press'
  },
  {
    title: 'The Fault in Our Stars',
    author: 'John Green',
    genre: 'Young Adult',
    published_year: 2012,
    price: 11.99,
    in_stock: true,
    pages: 313,
    publisher: 'Dutton Books'
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Mystery',
    published_year: 2012,
    price: 14.50,
    in_stock: false,
    pages: 422,
    publisher: 'Crown Publishing Group'
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genre: 'Crime',
    published_year: 2005,
    price: 13.50,
    in_stock: true,
    pages: 465,
    publisher: 'Norstedts Förlag'
  },
  {
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    genre: 'Fantasy',
    published_year: 1996,
    price: 18.99,
    in_stock: true,
    pages: 694,
    publisher: 'Bantam Spectra'
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    genre: 'Post-apocalyptic',
    published_year: 2006,
    price: 10.50,
    in_stock: false,
    pages: 287,
    publisher: 'Alfred A. Knopf'
  }
];

async function insertBooks() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop collection if exists to avoid duplicates
    const count = await collection.countDocuments();
    if (count > 0) {
      await collection.drop();
    }

    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books inserted.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

insertBooks();

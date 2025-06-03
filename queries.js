// queries.js - MongoDB queries for plp_bookstore

// --- Basic CRUD Operations ---

// 1. Find all books in a specific genre (e.g., "Fiction")
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (e.g., "George Orwell")
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (e.g., "The Hobbit")
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.99 } }
);

// 5. Delete a book by its title (e.g., "Moby Dick")
db.books.deleteOne({ title: "Moby Dick" });


// --- Advanced Queries ---

// 6. Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Use projection to return only the title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination: limit and skip (5 books per page)
// Page 1
db.books.find().limit(5);
// Page 2
db.books.find().skip(5).limit(5);


// --- Aggregation Pipeline ---

// 11. Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade and count them
db.books.aggregate([
  { $project: { decade: { $concat: [ { $substr: [ "$published_year", 0, 3 ] }, "0s" ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } }
]);


// --- Indexing ---

// 14. Create an index on the title field
db.books.createIndex({ title: 1 });

// 15. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 16. Use explain() to demonstrate performance improvement
db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "George Orwell", published_year: 1949 }).explain("executionStats");

// --- Ends of queries.js ---
db.movies.find({$or:[{"year":{$lt:2000},"year":{$gt:2010}}]})

db.movies.update({"name":"The Hobbit: An Unexpected Journey"}, 
{$set:{"synopsis":"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of drawrves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})


db.movies.update({"title":"The Hobbit: The Desolation of Smaug"}, {$set:{"synopsis":
"The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})

db.movies.update({"title":"Pulp Fiction"}, {$set:{"actors": ["John Travolta","Uma Thurman","Samuel L. Jackson"]}})



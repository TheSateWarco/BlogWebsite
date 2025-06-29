CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    creator_name VARCHAR(100) NOT NULL,
    creator_user_id VARCHAR(255) FOREIGN KEY,
    title VARCHAR(255),
    body TEXT,
    date_created TIMESTAMP

);

INSERT INTO blogs (creator_name) VALUES ('Elite'), ('Ink'),('Sate'),('Elite'), ('Ink');
INSERT INTO blogs (title) VALUES ('Crazy'), ('Devil May Cry'),('Game Dev'), ('Annoying people'), ('Percy Jackson');
INSERT INTO blogs (body) VALUES ('Crazy? I was crazy once. they locked me in a room. a rubber room. a rubber filled with rats. the rats made me crazy. Crazy?'), ('best game ever lol'),('making a game about autism woahhhh'), ('worst think about being the class clown is think that everyone hates you'),('the show was ok. the movies are good if you dont compare them to the books but trash if you do. the books are amazing');

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    name VARCHAR(255)
);

INSERT INTO users (name) VALUES ('Elite'), ('Ink'),('Sate');
INSERT INTO users (password) VALUES ('12345'), ('321'),('2468');
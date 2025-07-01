-- create users first so blogs can reference it
CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    name VARCHAR(255)
);

CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    creator_name VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    body TEXT,
    date_created TIMESTAMP,
	creator_user_id VARCHAR(255), -- define column before foreign key
	FOREIGN KEY (creator_user_id) REFERENCES users(user_id) ON DELETE SET NULL -- set user null if user deleted

);

-- data tehee

INSERT INTO users (user_id, password, name) VALUES
('elite001', '12345', 'Elite'),
('ink002', '321', 'Ink'),
('sate003', '2468', 'Sate');

INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES
('Elite', 'elite001', 'Crazy', 'Crazy? I was crazy once. They locked me in a room. A rubber room. A room filled with rats. The rats made me crazy. Crazy?', NOW()),
('Ink', 'ink002', 'Devil May Cry', 'Best game ever lol', NOW()),
('Sate', 'sate003', 'Game Dev', 'Making a game about autism woahhhh', NOW()),
('Elite', 'elite001', 'Annoying People', 'Worst thing about being the class clown is thinking everyone hates you', NOW()),
('Ink', 'ink002', 'Percy Jackson', 'The show was ok. The movies are good if you don’t compare them to the books but trash if you do. The books are amazing.', NOW());

-- database name is weekend-to-do-app

CREATE TABLE tasks (
    "task" varchar(500),
    "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks ("task", "isComplete")
VALUES ('Mow the lawn', 'No'),
('Do the dishes', 'No'),
('Study for exam', 'No'),
('Complete to do list', 'No'),
('Feed the cats', 'No')
;

SELECT * FROM tasks;
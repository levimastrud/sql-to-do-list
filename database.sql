-- database name is weekend-to-do-app

CREATE TABLE tasks (
    "id" serial primary key,
    "task" varchar(500),
    "is_complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks ("task", "is_complete")
VALUES ('Mow the lawn', 'No'),
('Do the dishes', 'No'),
('Study for exam', 'No'),
('Complete to do list', 'No'),
('Feed the cats', 'No')
;

SELECT * FROM tasks;
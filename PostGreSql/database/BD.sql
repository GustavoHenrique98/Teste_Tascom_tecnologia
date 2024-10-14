CREATE TABLE Users (
    ID SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Tasks (
    ID SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Em andamento', 'Finalizado')) NOT NULL,
    priority INTEGER CHECK (priority > 0 AND priority <= 10) NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(ID) ON DELETE CASCADE
);

CREATE TABLE Tags (
    ID SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    color VARCHAR(20) NOT NULL
);

CREATE TABLE Task_Tags (
    task_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES Tasks(ID) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(ID) ON DELETE CASCADE
);
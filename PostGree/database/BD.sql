create table Tasks(
    ID SERIAL PRIMARY KEY NOT NULL,
    title varchar(100),
    status VARCHAR(20) CHECK (status IN ('Em andamento', 'Finalizado')) NOT NULL,
    priority INTEGER CHECK (priority > 0 AND priority <= 10) NOT NULL,
    description TEXT,
    user_id integer,
    FOREIGN KEY (user_id) REFERENCES Users(ID) ON DELETE CASCADE
);

create table Users (
    ID SERIAL PRIMARY KEY NOT NULL ,
    username VARCHAR(50),
    password VARCHAR(50)
);

Create table Tags(

);
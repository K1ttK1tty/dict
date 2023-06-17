-- database: dictionary
create table user(
    id int auto_increment primary key,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL
);

create table activation(
    id int auto_increment primary key,
    isActivated BOOLEAN DEFAULT 0,
    activationLink VARCHAR(255) DEFAULT '',
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

create table token(
    id int auto_increment primary key,
    refreshToken VARCHAR(255) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
create table avatar(
    id int auto_increment primary key,
    avatarName VARCHAR(255) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
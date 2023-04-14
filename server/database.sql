-- database: dictionary, not added
create table user(
    id int auto_increment primary key,
    email VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL
);

create table activation(
    id into auto_increment primary key,
    isActivated BOOLEAN DEFAULT 0,
    activationLink VARCHAR(255) DEFAULT '',
    user_id int NOT NULL,
    FOREIGN KEY (user_ID) REFERENCES user (id)
)

create table token(
    id int auto_increment primary key,
    refreshToken VARCHAR(255) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
)
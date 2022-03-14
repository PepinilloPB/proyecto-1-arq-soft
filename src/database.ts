import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: 'mysql',
    user: 'root',
    password: '12345',
    database: 'twitter',
    port: 3306
});

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
});

export default pool;

/*

CREATE TABLE user(user_id int not null primary key auto_increment, user_name varchar(50), user_profile_img varchar(200));

CREATE TABLE tweet (tweet_id int not null primary key auto_increment, tweet_user int not null, tweet_text varchar(120), tweet_timestamp timestamp default current_timestamp, foreign key (tweet_user) references user(user_id));

CREATE TABLE follow (follower_id int not null, followee_id int not null, foreign key (follower_id) references user(user_id), foreign key (followee_id) references user(user_id));

INSERT INTO user (user_name, user_profile_img) VALUES ("eddy", "www.img.com"),("eddy182", "www.img.com"),("eddy183", "www.img.com");

INSERT INTO tweet (tweet_user, tweet_text) VALUES (1, "tweet"),(1, "tweet2"),(1, "tweet3"),(2, "tweet"),(2, "tweet2"),(3, "tweet");

INSERT INTO follow (follower_id, followee_id) VALUES 
    -> (1, 2),
    -> (1, 3),
    -> (2, 3);

*/ 
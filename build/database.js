"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const pool = promise_mysql_1.default.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'twitter',
    port: 3307
});
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
});
exports.default = pool;
/*

CREATE TABLE user(user_id int not null primary key auto_increment, user_name varchar(50), user_profile_img varchar(200));

CREATE TABLE tweet (tweet_id int not null primary key auto_increment, tweet_user int not null, tweet_text varchar(120), tweet_timestamp timestamp default current_timestamp, foreign key (tweet_user) references user(user_id));

CREATE TABLE follow (follower_id int not null, followee_id int not null, foreign key (follower_id) references user(user_id), foreign key (followee_id) references user(user_id));

*/ 

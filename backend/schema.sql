CREATE DATABASE comments_app;
USE comments_app;

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO comments (username, comment)
 VALUES ('ashish', 'hello, angela'),
('angela','hi, ashish');

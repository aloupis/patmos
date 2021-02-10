CREATE DATABASE patmos WITH OWNER postgres;
CREATE TABLE usr(
  id serial PRIMARY KEY, 
  username VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL
);
CREATE TABLE post(
  id serial PRIMARY KEY, 
  title VARCHAR(255) NOT NULL, 
  content TEXT, 
  created_at TIMESTAMP NOT NULL, 
  updated_at TIMESTAMP NOT NULL, 
  author_id INTEGER NOT NULL, 
  editor_id INTEGER NOT NULL, 
  FOREIGN KEY (author_id) REFERENCES usr (id), 
  FOREIGN KEY (editor_id) REFERENCES usr (id)
);
CREATE TABLE file(
  id serial PRIMARY KEY, 
  name VARCHAR(255) NOT NULL, 
  type VARCHAR(255) NOT NULL, 
  url VARCHAR(255) NOT NULL, 
  uploaded_by INTEGER NOT NULL, 
  uploaded_at TIMESTAMP NOT NULL, 
  FOREIGN KEY (uploaded_by) REFERENCES usr (id)
);
CREATE TABLE service(
  id serial PRIMARY KEY, 
  name VARCHAR(255) NOT NULL, 
  content TEXT, 
  price DECIMAL
);
INSERT INTO usr(username, email, password) 
VALUES 
  (
    'a_loop_is', 'manos.aloupis@gmail.com', 
    '$2b$10$ahs7h0hNH8ffAVg6PwgovO3AVzn1izNFHn.su9gcJnUWUzb2Rcb2W' -- = ssseeeecrreeet
  );

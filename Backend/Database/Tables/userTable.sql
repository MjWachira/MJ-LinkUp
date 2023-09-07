CREATE TABLE usersTable (
    userID INT PRIMARY KEY IDENTITY(1,1),
    fullname NVARCHAR(100) NOT NULL,
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    coverpic NVARCHAR(1000) ,
    profpic NVARCHAR(1000) ,
    bio NVARCHAR(100)
);

-- DROP TABLE Users;


INSERT INTO usersTable (fullname, username, email, Password, coverpic, profpic, bio)
VALUES ('John Doe', 'johndoe123', 'johndoe@example.com', 'hashed_password', 'cover.jpg', 'profile.jpg', 'A brief bio about me');


SELECT * FROM usersTable;
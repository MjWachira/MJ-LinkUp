CREATE TABLE postsTable (
    postID INT PRIMARY KEY IDENTITY(1,1),
    postDescription NVARCHAR(255) NOT NULL,
    postImage NVARCHAR(MAX),
    userID INT NOT NULL,
    dateCreated DATETIME NOT NULL,
    FOREIGN KEY (userID) REFERENCES usersTable(userID) ON DELETE CASCADE
);
DROP TABLE postsTable;

SELECT * FROM postsTable;


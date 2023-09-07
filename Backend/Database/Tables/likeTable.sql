CREATE TABLE likeTable (
    likeID INT PRIMARY KEY IDENTITY(1,1),
    postID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (postID) REFERENCES postsTable(postID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES usersTable(userID)
);

DROP TABLE likeTable;

SELECT * FROM likeTable;
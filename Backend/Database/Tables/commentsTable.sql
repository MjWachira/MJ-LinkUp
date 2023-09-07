CREATE TABLE commentsTable (
    commentID INT PRIMARY KEY IDENTITY(1,1),
    commentDescription NVARCHAR(1000) NOT NULL,
    dateCreated DATETIME NOT NULL,
    userID INT NOT NULL,
    postID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES usersTable(userID) ON DELETE CASCADE,
    FOREIGN KEY (postID) REFERENCES postsTable(postID)
);

SELECT*FROM commentsTable;

DROP TABLE Comments;
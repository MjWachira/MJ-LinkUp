CREATE TABLE followTable (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FollowUserID INT NOT NULL,
    FollowedUserID INT NOT NULL,
    FOREIGN KEY (FollowUserID) REFERENCES usersTable(userID) ON DELETE CASCADE,
    FOREIGN KEY (FollowedUserID) REFERENCES usersTable(userID) 
);

SELECT*FROM followTable
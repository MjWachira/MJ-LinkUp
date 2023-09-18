CREATE OR ALTER PROCEDURE ShowUsersNotFollowingMe
    @UserID INT
AS
BEGIN
    SELECT u.fullname, u.profPic, u.userID, u.username
    FROM usersTable AS u
    LEFT JOIN followTable AS f ON u.UserID = f.FollowUserID AND f.FollowedUserID = @UserID
    WHERE f.ID IS NULL AND u.UserID <> @UserID;
END;

EXEC ShowUsersNotFollowingMe @UserID = 34; 

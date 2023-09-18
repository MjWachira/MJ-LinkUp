CREATE OR ALTER PROCEDURE ShowFollowers
    @FollowedUserID INT
AS
BEGIN
    SELECT u.username, u.profPic, u.fullname, u.userID
    FROM followTable AS f
    INNER JOIN usersTable AS u ON f.FollowUserID = u.UserID
    WHERE f.FollowedUserID = @FollowedUserID;
END;


EXEC ShowFollowers @FollowedUserID = 34;
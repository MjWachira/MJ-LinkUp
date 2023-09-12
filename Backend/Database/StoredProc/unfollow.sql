CREATE OR ALTER PROCEDURE UnfollowUser
    @FollowerUserID INT,
    @FollowedUserID INT
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM followTable
        WHERE FollowUserID = @FollowerUserID AND FollowedUserID = @FollowedUserID
    )
    BEGIN
        DELETE FROM followTable
        WHERE FollowUserID = @FollowerUserID AND FollowedUserID = @FollowedUserID;
    END;
    ELSE
    BEGIN
        THROW 51000, 'The relationship does not exist.', 1;
    END;
END;


EXEC UnfollowUser @FollowerUserID = 36, @FollowedUserID = 34;


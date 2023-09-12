CREATE OR ALTER PROCEDURE FollowUser
    @FollowUserID INT,
    @FollowedUserID INT
AS
BEGIN
    
    IF NOT EXISTS (
        SELECT 1
        FROM followTable
        WHERE FollowUserID = @FollowUserID AND FollowedUserID = @FollowedUserID
    )
    BEGIN

        INSERT INTO followTable (FollowUserID, FollowedUserID)
        VALUES (@FollowUserID, @FollowedUserID);
    END;
    ELSE
    BEGIN
        THROW 51000, 'The relationship already exists.', 1;
    END;
END;


use LinkUp
go
EXEC FollowUser @FollowUserID = 36, @FollowedUserID = 34;


SELECT*FROM followTable



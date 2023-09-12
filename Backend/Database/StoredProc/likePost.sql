CREATE OR ALTER PROCEDURE LikePost
    @postID INT,
    @userID INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM likeTable 
    WHERE postID = @postID AND userID = @userID)
    BEGIN
        INSERT INTO likeTable (postID, userID)
        VALUES (@postID, @userID);
    END
END;



EXEC LikePost @postID =11, @userID =36;

SELECT * FROM likeTable;

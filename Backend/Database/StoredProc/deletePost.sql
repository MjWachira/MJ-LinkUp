CREATE OR ALTER PROCEDURE deletePost (@postID VARCHAR(200))
AS
BEGIN 
    
    DELETE FROM commentsTable WHERE postID = @postID;

    
    DELETE FROM postsTable WHERE postID = @postID;
END

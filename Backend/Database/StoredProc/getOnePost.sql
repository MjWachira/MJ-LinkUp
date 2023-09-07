CREATE OR ALTER PROCEDURE getOnePost (@postID VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM postsTable WHERE postID = @postID
    END
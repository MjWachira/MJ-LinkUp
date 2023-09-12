CREATE OR ALTER PROCEDURE getOneComment 
(@commentID VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM commentsTable 
        WHERE commentID = @commentID
    END
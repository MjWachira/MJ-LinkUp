CREATE OR ALTER PROCEDURE deleteComment 
(@commentID VARCHAR(200))
AS
BEGIN 
    DELETE FROM commentsTable 
    WHERE commentID=@commentID
END
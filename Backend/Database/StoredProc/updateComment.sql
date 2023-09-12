CREATE OR ALTER PROCEDURE UpdateComment
(
    @commentID INT,
    @commentDescription NVARCHAR(1000)
)
AS
BEGIN
    UPDATE commentsTable
    SET
        commentDescription = @commentDescription
    WHERE commentID = @commentID;
END;




EXEC UpdateComment
    @commentID = 2, 
    @commentDescription = 'Updated comment text';

SELECT*FROM commentsTable;


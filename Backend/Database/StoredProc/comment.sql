CREATE OR ALTER PROCEDURE addComment
    (@commentDescription NVARCHAR(1000),
    @postID VARCHAR(200), 
    @userID VARCHAR(200), 
    @dateCreated DATE)
AS
BEGIN
    INSERT INTO commentsTable(commentDescription,postID, userID, dateCreated)
    VALUES (@commentDescription, @postID,@userID,GETDATE());
END

EXEC AddComment
    @commentDescription = 'This another is a sample comment.',
    @userID = 34, 
    @dateCreated = "2022-07-12",           
    @postID = 11 ;          

SELECT * FROM commentsTable
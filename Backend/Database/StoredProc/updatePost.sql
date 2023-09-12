CREATE OR ALTER PROCEDURE updatePost(
    @postID INT,
    @postDescription NVARCHAR(255),
    @postImage NVARCHAR(MAX)
)
AS
BEGIN
    -- SET NOCOUNT ON;
    UPDATE postsTable
    SET postDescription = @postDescription,
        postImage = @postImage
    WHERE postID = @postID;
END;


EXEC UpdatePost
    @postID = 12, 
    @postDescription = 'Updated post description',
    @postImage = 'updated_image.jpg';

SELECT*FROM postsTable


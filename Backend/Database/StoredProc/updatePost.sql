
-- CREATE OR ALTER PROCEDURE updatePost 
-- (@postID NVARCHAR(200),
-- @postDescription NVARCHAR(255), 
-- @postImage VARCHAR(1000),
-- @userID VARCHAR(100))

-- AS
--     BEGIN
--         UPDATE postsTable SET 
--         postDescription = @postDescription,
--         postImage = @postImage,
--         userID=@userID
--          WHERE postID= @postID
--     END

CREATE OR ALTER PROCEDURE updatePost
    @postID INT,
    @postDescription NVARCHAR(255),
    @postImage NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE postsTable
    SET postDescription = @postDescription,
        postImage = @postImage
    WHERE postID = @postID;
END;

    -- Example usage:
EXEC UpdatePost
    @postID = 1, -- Replace with the actual post ID you want to update
    @postDescription = 'Updated post description',
    @postImage = 'updated_image.jpg';


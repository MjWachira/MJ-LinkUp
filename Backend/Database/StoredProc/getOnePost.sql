CREATE OR ALTER PROCEDURE getOnePost (@postID VARCHAR(200))
AS  
    BEGIN 
         SELECT u.username, u.profPic, p.dateCreated, p.postDescription, p.postImage, p.postID 
    FROM usersTable AS u
    INNER JOIN postsTable AS p ON u.UserID = p.UserID WHERE @postID = postID
END

-- Create a stored procedure to get one post with username and pic, including all comments
-- CREATE OR ALTER PROCEDURE getOnePost
--     @postID INT
-- AS
-- BEGIN
    
--     DECLARE @postDescription NVARCHAR(255)
--     DECLARE @postImage NVARCHAR(MAX)
--     DECLARE @username NVARCHAR(50)
--     DECLARE @profpic NVARCHAR(1000)

   
--     SELECT
--         p.postDescription,
--         p.postImage,
--         u.username,
--         u.profpic
--     FROM
--         postsTable p
--     INNER JOIN
--         usersTable u ON p.userID = u.userID
--     WHERE
--         p.postID = @postID;

--     SELECT
--         c.commentDescription,
--         c.dateCreated,
--         u.username AS commentUsername
--     FROM
--         commentsTable c
--     INNER JOIN
--         usersTable u ON c.userID = u.userID
--     WHERE
--         c.postID = @postID;

-- END;

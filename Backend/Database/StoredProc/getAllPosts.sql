CREATE OR ALTER PROCEDURE getAllPosts
AS
BEGIN
    SELECT u.username, u.profPic, p.dateCreated, p.postDescription, p.postImage, p.postID 
    FROM usersTable AS u
    INNER JOIN postsTable AS p ON u.UserID = p.UserID
END

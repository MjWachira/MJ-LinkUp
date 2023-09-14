CREATE OR ALTER PROCEDURE getAllPosts
AS
BEGIN
    SELECT u.username, u.profPic, p.dateCreated, p.postDescription, p.postImage, p.postID ,c.commentDescription
    FROM usersTable AS u
    INNER JOIN postsTable AS p ON u.UserID = p.UserID
    LEFT JOIN commentstable AS c ON p.PostID = c.PostID;
END

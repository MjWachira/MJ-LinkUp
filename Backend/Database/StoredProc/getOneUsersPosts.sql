CREATE OR ALTER PROCEDURE getUserPost
    (@userID INT)
AS
BEGIN
    SELECT u.username, u.profPic, 
    p.dateCreated, p.postDescription,
    p.postImage, p.postID 
    FROM usersTable AS u
    INNER JOIN postsTable AS p ON u.userID = p.userID
    WHERE u.userID = @userID
END


EXEC getUserPost @userID = 1107; 
CREATE OR ALTER PROCEDURE createPost
    (@postDescription  VARCHAR(500),
    @postImage VARCHAR(1000),
    @userID VARCHAR(200), 
    @dateCreated DATE)
AS
BEGIN
    INSERT INTO postsTable(postDescription,postImage, userID, dateCreated)
    VALUES (@postDescription,@postImage, @userID, GETDATE());
END


INSERT INTO postsTable (postDescription, postImage, userID, dateCreated)
VALUES ('This is a new post', 'image.jpg', 1, GETDATE());
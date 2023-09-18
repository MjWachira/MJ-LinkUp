-- Create a stored procedure to get all comments for a specific post
CREATE OR ALTER PROCEDURE getCommentsForPost
    @postID INT
AS
BEGIN
    -- Retrieve all comments for the specified post
    SELECT
        c.commentID,
        c.commentDescription,
        c.dateCreated,
        u.username AS username,
        u.profpic AS profpic
    FROM
        commentsTable c
    INNER JOIN
        usersTable u ON c.userID = u.userID
    WHERE
        c.postID = @postID;
END;

EXEC GetCommentsForPost @postID = 2058; -- Replace 1 with the desired post ID

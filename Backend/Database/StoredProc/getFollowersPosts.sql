CREATE OR ALTER PROCEDURE followingPosts
    @MyUserID INT
AS
BEGIN
    SELECT u.userID AS UserID, u.fullname, u.username, u.email, u.coverpic, u.profpic, u.bio,
           p.postID, p.postDescription, p.postImage, p.dateCreated
    FROM followTable AS f
    INNER JOIN usersTable AS u ON f.FollowedUserID = u.userID
    LEFT JOIN postsTable AS p ON u.userID = p.userID
    WHERE f.FollowUserID = @MyUserID;
END;



EXEC followingPosts @MyUserID = 34;

CREATE OR ALTER PROCEDURE UpdateUserProfile
(
    @userID INT,
    @fullname NVARCHAR(255),
    @coverPic NVARCHAR(MAX),
    @profpic NVARCHAR(MAX),
    @email NVARCHAR(100),
    @password NVARCHAR(255)
)
AS
BEGIN
    UPDATE usersTable
    SET
        fullname = @fullname,
        coverpic = @coverpic,
        profPic = @profPic,
        email = @email,
        Password = @password
    WHERE userID = @userID;
END;



EXEC UpdateUserProfile
    @userID = 36,
    @fullname = 'John Wachira', 
    @coverPic = 'new_cover.jpg',
    @profpic = 'new_profile.jpg', 
    @email = 'johnwachira4.com', 
    @password = 'newpassword'; 

SELECT*FROM usersTable;


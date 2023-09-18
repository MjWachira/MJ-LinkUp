CREATE OR ALTER PROCEDURE registerUser(@fullname VARCHAR(200),@profpic NVARCHAR(1000), @username VARCHAR(200), @email VARCHAR(200), @Password VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(fullname,profpic, username, email, Password)
    VALUES(@fullname,@profpic, @username, @email, @Password)
END


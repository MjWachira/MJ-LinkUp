CREATE OR ALTER PROCEDURE registerUser(@fullname VARCHAR(200), @username VARCHAR(200), @email VARCHAR(200), @Password VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(fullname, username, email, Password)
    VALUES(@fullname, @username, @email, @Password)
END

DROP PROCEDURE reUserProc;
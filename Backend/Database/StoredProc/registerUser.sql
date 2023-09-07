CREATE OR ALTER PROCEDURE registerUsersProc(@userID VARCHAR(200), @fullname VARCHAR(200),@username VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(userID, fullname,username,email, password) VALUES(@userID, @fullname,@username, @email, @password)
END


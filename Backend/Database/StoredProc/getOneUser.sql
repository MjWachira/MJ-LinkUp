CREATE OR ALTER PROCEDURE getOneUser (@userID VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM usersTable WHERE userID = @userID
    END

DROP PROCEDURE getOneUser
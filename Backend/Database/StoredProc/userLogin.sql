CREATE OR ALTER PROCEDURE userLogin(@username VARCHAR(200))
AS
BEGIN
    SELECT * FROM usersTable WHERE username = @username
END
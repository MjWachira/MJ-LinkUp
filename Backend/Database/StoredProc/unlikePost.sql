CREATE PROCEDURE Unlike
    @likeID INT
AS
BEGIN
    DELETE FROM likeTable
    WHERE likeID = @likeID;
END;


EXEC Unlike @likeID = 1;

SELECT*FROM likeTable

import mssql from 'mssql'
import { addComment, deleteComment, editComment, getAllComments, getOnePostComments } from './commentsController'



const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()


}

describe(" Comment Controller", ()=>{

    describe("adding a new comment to a post", ()=>{
        it("should add a comment successfully", async()=> {
            const commentID="3"
            const mockComment={

                    postDescription: 'This is a test post.',
                    postID: '23',
                    userID: '23',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:commentID},
            body:mockComment
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected:[1] 
            })

        })
        await addComment(req,res)
        
        expect(res.json).toHaveBeenCalledWith({
                message: "comment added Successfully"
            })
    
        })
    })
        it("should return error when post not created", async()=> {
            const commentID="3"
            const mockComment={

                    postDescription: 'This is a test post.',
                    postID: '23',
                    userID: '23',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:commentID},
            body:mockComment
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
               rowsAffected: [0]
            })

        })
        await addComment(req,res)

        expect(res.json).toHaveBeenCalledWith({
            message: "comment not added"
         })
    
    })
    
    describe("Gets all comments", ()=>{
        it("should return all comments" , async()=>{
            const mockComment = [
                {
                    commentID: 1023,
                    commentDescription: "nice post",
                    dateCreated: "2023-09-15T14:53:24.607Z",
                    userID: 1059,
                    postID: 2058
                },
            
            ]
            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockComment
                })
            })

            await getAllComments(req, res)

            //expect(jest.fn(res.status)).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({allComments:mockComment})
        })
    })

    describe("Getting comments By PostID", ()=>{
        it ("should return the specified comments of a post", async()=>{
            const postID = '4'
            const mockComment = {
                "commentID": 1023,
                "commentDescription": "vbbbbb",
                "dateCreated": "2023-09-15T14:53:24.607Z",
                "username": "lucy",
                "profpic": "http://res.jpg"
              }

            const req = {
                params: {
                    id: postID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockComment]
                })
            })

            await getOnePostComments(req, res)

            expect(res.json).toHaveBeenCalledWith({comments: [mockComment]})
        })

    })

    describe("Updating a comment", ()=>{
        it("should update a comment successfully", async()=>{
            const commentID="3"
            const mockComment={

                    commentDescription: 'This is a test post.',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:commentID},
            body:mockComment
        }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await editComment(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: "comment updated successfully"
            })
        })

        it("should return error when comment ID does not exist", async ()=>{
            const commentID="3"
            const mockComment={

                    commentDescription: 'This is a test post.',
                    dateCreated: '2023-09-19', 
                
            }
            const req = {
                params:{id:commentID},
                body:mockComment
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await editComment(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'comment not found'
            })
        }) 
    })


    describe("Deleting a comment", ()=>{
        it("should delete the comment successfully", async()=>{
            const commentID = '34'
            const req = {
                params:{
                    id: commentID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:([1])
                })
            })

            await deleteComment(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'comment deleted successfully'
            })
        })

        it("should return an error ' post not found'", async()=>{
            const commentID = '34'
            const req = {
                params:{
                    id: commentID
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await deleteComment(req, res)


            expect(res.json).toHaveBeenCalledWith({
                message: 'comment not found'
            })
        })
    })
 })
    
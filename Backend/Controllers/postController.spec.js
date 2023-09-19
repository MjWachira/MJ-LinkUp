import mssql from 'mssql'
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from './postController'


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()


}

describe("Posts Controller", ()=>{

    describe("creating a new post", ()=>{
        it("should create a post successfully", async()=> {
            const postID="3"
            const mockPost={

                    postDescription: 'This is a test post.',
                    postImage: 'image.jpg',
                    userID: 'user123',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:postID},
            body:mockPost
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected:[1] 
            })

        })
        await createPost(req,res)
        
        expect(res.json).toHaveBeenCalledWith({
                message: "post created Successfully"
            })
    
        })
    })
        it("should return error when post not created", async()=> {
            const postID="3"
            const mockPost={

                    postDescription: 'This is a test post.',
                    postImage: 'image.jpg',
                    userID: 'user123',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:postID},
            body:mockPost
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
               rowsAffected: [0]
            })

        })
        await createPost(req,res)

        expect(res.json).toHaveBeenCalledWith({
            message: "creation failed"
         })
    
    })
    
    describe("Gets all Posts", ()=>{
        it("should return all posts" , async()=>{
            const mockPost = [
                {
                    username: "lucy",
                    profPic: "http://res.cloudinary.com/du1zkniut/image/upload/v1695032555/sij4dwjahfgcafn5py08.jpg",
                    dateCreated: "2023-09-15T14:24:53.203Z",
                    postDescription: "Edited",
                    postImage: "http://res.cloudinary.com/du1zkniut/image/upload/v1695034934/eun5dmxjl6swbdp1fghh.jpg",
                    postID: 2058
                },
            
            ]
            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockPost
                })
            })

            await getAllPosts(req, res)

            //expect(jest.fn(res.status)).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({posts:mockPost})
        })
    })

    describe("Getting Post By ID", ()=>{
        it ("should return the specified post", async()=>{
            const postID = '4'
            const mockPost = {
                username: "lucy",
                    profPic: "http://res.cloudinary.com/du1zkniut/image/upload/v1695032555/sij4dwjahfgcafn5py08.jpg",
                    dateCreated: "2023-09-15T14:24:53.203Z",
                    postDescription: "Edited",
                    postImage: "http://res.cloudinary.com/du1zkniut/image/upload/v1695034934/eun5dmxjl6swbdp1fghh.jpg",
                    postID: 2058
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
                    recordset: [mockPost]
                })
            })

            await getOnePost(req, res)

            expect(res.json).toHaveBeenCalledWith({post: [mockPost]})
        })

    })

    describe("Updating a Post", ()=>{
        it("should update a post successfully", async()=>{
            const postID="3"
            const mockPost={

                    postDescription: 'This is a test post.',
                    postImage: 'image.jpg',
                    userID: 'user123',
                    dateCreated: '2023-09-19', 
                
        }
        const req = {
            params:{id:postID},
            body:mockPost
        }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await updatePost(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: "post updated successfully"
            })
        })

        it("should return error when post ID does not exist", async ()=>{
            const postID="3"
            const mockPost={

                postDescription: 'This is a test post.',
                postImage: 'image.jpg',
                userID: 'user123',
                dateCreated: '2023-09-19', 
            
            }
            const req = {
                params:{id:postID},
                body:mockPost
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await updatePost(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'post not found'
            })
        }) 
    })


    describe("Deleting a post", ()=>{
        it("should delete the post successfully", async()=>{
            const postID = '34'
            const req = {
                params:{
                    id: postID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:([1,1])
                })
            })

            await deletePost(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'post deleted successfully'
            })
        })

        it("should return an error ' post not found'", async()=>{
            const postID = '34'
            const req = {
                params:{
                    id: postID
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

            await deletePost(req, res)


            expect(res.json).toHaveBeenCalledWith({
                message: 'post not found'
            })
        })
    })
 })
    
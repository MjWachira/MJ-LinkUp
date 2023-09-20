import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/config";
const { regUser, userLogin, updateUser } = require('./authController');


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

describe('Register a new user', () => {
  it('registers a user successfully', async () => {

    const mockeUser = {
        fullname: 'John Doe',
        profpic: 'profile.jpg',
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123'
      }

    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("rfudjsdbdubaruehuhaehuhuarehfvu");
    
    const req = {
      body:mockeUser,
    };

  
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        })
    });

    await regUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });
  it('fails if a user isnt successfully registered', async () => {
    
    // const mockeUser = {
    //     fullname: 'John Doe',
    //     profpic: 'profile.jpg',
    //     username: 'johndoe',
    //     email: 'johndoe@example.com',
    //     password: 'password123'
    //   }

    // jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("rfudjsdbdubaruehuhaehuhuarehfvu");
    
    // const req = {
    //   body:mockeUser,
    // };

  
    // jest.spyOn(mssql, "connect").mockResolvedValueOnce({
    //     request: jest.fn().mockReturnThis(),
    //     input: jest.fn().mockReturnThis(),
    //     execute: jest.fn().mockResolvedValueOnce({
    //     rowsAffected: [0],
    //     })
    // });

    // await regUser(req, res);
    
    // expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe('login a new user', () => {
  it('should login a user successfully', async () => {
    const mockeUser = {
        username: 'johndoe',
        password: 'password123'
      }
    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("rfudjsdbdubaruehuhaehuhuarehfvu");
    
    const req = {
      body:mockeUser,
    };  
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        })
    });

    await userLogin(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ 
    //   message: 'Logged in',
    //   token
    //  });
  });

});
describe('updating a user', () => {
  it('should update a user successfully', async () => {
    // const userID="36"
    // const mockuser={
    //   fullname: "John Wachira",
    //   coverpic: "https://res.cloudinary.com/du1zkniut/image/upload/v1692710886/samples/smile.jpg",
    //   profpic: "https://res.cloudinary.com/du1zkniut/image/upload/v1692710886/samples/smile.jpg",
    //   email: "mjwachira1@gmail.com",
    //   password: "12345678"      
    //   }

    // const req = {
    //         params:{id:userID},
    //         body:mockuser
    //   }
            
    //   jest.spyOn(mssql, "connect").mockResolvedValueOnce({
    //             request: jest.fn().mockReturnThis(),
    //             input: jest.fn().mockReturnThis(),
    //             execute: jest.fn().mockResolvedValueOnce({
    //                 rowsAffected: [1]
    //             })
    //   })

    //         await updateUser(req, res)

    //         expect(res.json).toHaveBeenCalledWith({
    //             message: "user updated successfully"
    //         })

  })
  it('should error if user not updated successfully', async () => {


  })

})
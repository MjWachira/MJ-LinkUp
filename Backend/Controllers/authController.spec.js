import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../Config/config";
const { regUser } = require('./authController');


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

describe('Register a new user', () => {
  it('registers a user successfully', async () => {
    // Mock the request and response objects
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

    // Mock the mssql.connect and mssql.request functions
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({
          rowsAffected: [1],
        })
    });

    // Call the regUser function
    await regUser(req, res);

    // Expectations
    // expect(bcrypt.hash).toHaveBeenCalledWith('password123', 4);
    // expect(connect).toHaveBeenCalledWith(sqlConfig);
    // expect(request().input).toHaveBeenCalledWith('fullname', 'John Doe');
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });

//   it('handles registration failure', async () => {
//     // Mock the request and response objects
//     const req = {
//       body: {
//         // Provide duplicate email or username to simulate failure
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     // Mock the mssql.connect and mssql.request functions to simulate failure
//     const { connect, request } = require('mssql');
//     connect.mockResolvedValue({});
//     request.mockRejectedValue(new Error('Some error message'));

//     // Call the regUser function
//     await regUser(req, res);

//     // Expectations
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ error: 'Some error message' });
//   });

//   it('handles duplicate email or username', async () => {
//     // Mock the request and response objects
//     const req = {
//       body: {
//         // Provide duplicate email or username to simulate failure
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     // Mock the mssql.connect and mssql.request functions to simulate unique key violation
//     const { connect, request } = require('mssql');
//     connect.mockResolvedValue({});
//     request.mockRejectedValue(new Error('UNIQUE KEY constraint violated'));

//     // Call the regUser function
//     await regUser(req, res);

//     // Expectations
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Email or username already exists' });
//   });
});


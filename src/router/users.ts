import express from 'express';
import { deleteUser, getAllUsers } from '../controllers/users';
import { isOwner,isAuthenticated } from '../middleware/index';


export default (router:express.Router)=>{
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users:id',isOwner,deleteUser)
}
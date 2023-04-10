const express=require("express");
const { registerUser, loginUser, logout, getUserDetails, updateUserDetails, getAllUsers, deleteUser, updateUserRole, getSingleUser } = require("../controllers/userControllers");
const { isAuthenticatedUser, authRoles } = require("../middleware/AuthMiddleware");
const router=express.Router();
router.post("/user/new",registerUser)
router.post("/user/login",loginUser)
router.get("/user/me",isAuthenticatedUser,getUserDetails)
router.put("/user/update",isAuthenticatedUser,updateUserDetails)
router.get("/user/logout",logout)
router.get("/admin/users/all",isAuthenticatedUser,authRoles("admin"),getAllUsers)
router.get("/admin/user/:id",isAuthenticatedUser,authRoles("admin"),getSingleUser)
router.delete("/admin/user/:id",isAuthenticatedUser,authRoles("admin"),deleteUser)
router.put("/admin/user/:id",isAuthenticatedUser,authRoles("admin"),updateUserRole)
module.exports=router

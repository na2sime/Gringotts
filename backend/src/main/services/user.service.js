const User = require("../api/user/user.model");
const bcrypt = require("bcrypt");

const UserService = {
    createUser: async (reqBody) => {
        if (!hasAllRequiredFieldsCreate(reqBody)) {
            return {error: "Missing required fields"};
        }
        try {
            // hash the password
            const hash = await bcrypt.hash(reqBody.password, 10);
            // create the user with hashed password
            const user = new User({...reqBody, password: hash});
            return await user.save();
        } catch (err) {
            console.error("Error in UserService.createUser: ", err);
            return {error: err};
        }
    },

    getUserByEmail: async (email) => {
        if (!email) {
            return {error: "Missing email"};
        }
        return User.findOne({email});
    },

    updateUser: async (email, updatedDetails) => {
        if (!email) {
            return {error: "Missing email"};
        }
        if (!updatedDetails) {
            return {error: "Missing updated details"};
        }
        return User.updateOne({email}, {$set: updatedDetails});
    },

    updateUserRole: async (email, newRole) => {
        if (!email) {
            return {error: "Missing email"};
        }
        if (!newRole) {
            return {error: "Missing new role"};
        }
        return User.updateOne({email}, {$set: {role: newRole}});
    },

    deleteUser: async (email) => {
        if (!email) {
            return {error: "Missing email"};
        }
        return User.deleteOne({email});
    },

    getAllUsers: async () => {
        return User.find();
    }
};

const hasAllRequiredFieldsCreate = (reqBody) => {
    return reqBody.email && reqBody.password && reqBody.role && reqBody.firstName && reqBody.lastName && reqBody.phoneNumber && reqBody.address;
};

module.exports = UserService;
import {userStub} from "../../../test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
    getAllUsers: jest.fn().mockResolvedValue([userStub()]),
    createUser: jest.fn().mockResolvedValue(userStub()),
})
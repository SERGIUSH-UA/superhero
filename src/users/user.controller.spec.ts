import { Test } from '@nestjs/testing';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {userStub} from "../../test/stubs/user.stub";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Superhero} from "../superhero/superhero.model";
import {FavoriteSuperheros} from "../superhero/favorite-superheros.model";




jest.mock('./users.service');

describe('UserController', () => {
    let userController: UsersController;
    let userService: UsersService;



    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
            // imports: [SequelizeModule.forFeature([User, Superhero, FavoriteSuperheros])]
        }).compile();

        userService = moduleRef.get<UsersService>(UsersService);
        userController = moduleRef.get<UsersController>(UsersController);
        jest.clearAllMocks();
    });
    //
    describe('GetAllUsers', () => {
        describe('when getAll called',  () => {
            let users: User[];
            const result = [userStub()];
            beforeEach(async () =>{
                users = await userController.getAll();
            })
            test('then it should call userService', () => {
                expect(userService.getAllUsers).toHaveBeenCalled();
            })
            test('then should return an array of users', async () => {
                expect(await userController.getAll()).toStrictEqual(result);
            })
        });
    });

    describe('when createUser called', () => {
        it('should return a new user', async () => {
            const result = userStub();
            expect(await userController.create(userStub())).toStrictEqual(result);
        });
    });

});
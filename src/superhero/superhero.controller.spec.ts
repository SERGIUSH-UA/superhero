import { Test } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import {UsersService} from "../users/users.service";
import {Superhero} from "./superhero.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/user.model";
import {getAllStub} from "../../test/stubs/superhero.stub";

jest.mock('./superhero.service');
jest.mock('../users/users.service');

describe('SuperheroController', () => {
    let superheroController: SuperheroController;
    let superheroService: SuperheroService;
    // let userService: UsersService;
    // let heroRepository: typeof Superhero;
    // let fileService: FilesService;

    const superheroServiceMoke = {};
    const userServiceMoke = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [SuperheroController],
            providers: [SuperheroService, UsersService],
        }).compile();

        superheroService = moduleRef.get<SuperheroService>(SuperheroService);
        superheroController = moduleRef.get<SuperheroController>(SuperheroController);
        jest.clearAllMocks();
    });
    //
    describe('getAll', () => {
        it('should return an array of sups with count', async () => {
            const result = getAllStub();
            expect(await superheroController.getAll(1,0)).toStrictEqual(result);
        });
    });

});
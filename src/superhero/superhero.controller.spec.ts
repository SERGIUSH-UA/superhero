import { Test } from '@nestjs/testing';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import {UsersService} from "../users/users.service";
import {Superhero} from "./superhero.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/user.model";

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
        }).overrideProvider(SuperheroService).useValue(superheroServiceMoke)
            .overrideProvider(User).useValue(userServiceMoke).compile();

        superheroService = moduleRef.get<SuperheroService>(SuperheroService);
        superheroController = moduleRef.get<SuperheroController>(SuperheroController);
    });
    //
    describe('getAll', () => {
        it('should return an array of sups with count', async () => {
            const result = { rows:[], count:0};
            jest.spyOn(superheroService, 'getAllSuperheroes').mockImplementation(async () => result);

            expect(await superheroController.getAll(1,0)).toBe(result);
        });
    });

});
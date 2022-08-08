import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SuperheroModule } from '../src/superhero/superhero.module';
import { SuperheroService } from '../src/superhero/superhero.service';
import { INestApplication } from '@nestjs/common';

describe('Superheroes', () => {
    let app: INestApplication;
    let superheroService = { getAllSuperheroes: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [SuperheroModule],
        })
            .overrideProvider(SuperheroService)
            .useValue(superheroService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET superheroes`, () => {
        return request(app.getHttpServer())
            .get('/api/superheroes')
            .expect(200)
            .expect({
                data: superheroService.getAllSuperheroes(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
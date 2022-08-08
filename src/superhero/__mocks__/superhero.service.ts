import {getAllStub, superheroStub} from "../../../test/stubs/superhero.stub";

export const SuperheroService = jest.fn().mockReturnValue({
    getAllSuperheroes: jest.fn().mockResolvedValue(getAllStub())
})
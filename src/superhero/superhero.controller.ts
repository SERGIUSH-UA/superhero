import {Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SuperheroService} from "./superhero.service";
import {Superhero} from "./superhero.model";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@ApiTags('Superheros')
@Controller('api/superheros')
export class SuperheroController {

    constructor(private superheroService: SuperheroService) {
    }

    @ApiOperation({summary: 'Creating new superhero'})
    @ApiResponse({status: 200, type: Superhero})
    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    create(@Body() heroDto: CreateSuperheroDto,
           @UploadedFiles() images) {
        return this.superheroService.createSuperhero(heroDto, images);
    }

    @ApiOperation({summary: 'Getting all users from catalog'})
    @ApiResponse({status: 200, type: [Superhero]})
    @Get()
    getAll(){
        return this.superheroService.getAllSuperheroes();
    }

}

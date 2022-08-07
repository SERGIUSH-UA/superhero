import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SuperheroService} from "./superhero.service";
import {Superhero} from "./superhero.model";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {UpdateSuperheroDto} from "./dto/update-superhero.dto";
import {FavoriteSuperheroDto} from "./dto/favorite-superhero.dto";
import {User} from "../users/user.model";

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

    @ApiOperation({summary: 'Getting superhero from catalog by ID'})
    @ApiResponse({status: 200, type: Superhero})
    @Get(':id')
    getOne(@Param('id') id: string){
        return this.superheroService.getOne(id);
    }

    @ApiOperation({summary: 'Getting all superheroes from catalog'})
    @ApiResponse({status: 200, type: [Superhero]})
    @Get()
    getAll( @Query('_limit') limit: number,
            @Query('_page') page: number){
        return this.superheroService.getAllSuperheroes(limit, page);
    }

    @ApiOperation({summary: 'Remove superhero by ID from favorite'})
    @ApiResponse({status: 200, type: User})
    @Put('/favorite')
    removeFromFavorite(@Body() favoriteDto: FavoriteSuperheroDto) {
        return this.superheroService.removeFromFavorite(favoriteDto);
    }

    @ApiOperation({summary: 'Deleting superhero from catalog by ID'})
    @ApiResponse({status: 200, type: Superhero})
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.superheroService.remove(id);
    }

    @ApiOperation({summary: 'Updating superhero in catalog by ID'})
    @ApiResponse({status: 200, type: Superhero})
    @Put(':id')
    @UseInterceptors(FilesInterceptor('images'))
    update(@Param('id') id: string,
           @Body() heroDto: UpdateSuperheroDto,
           @UploadedFiles() images){
        return this.superheroService.update(id, heroDto, images);
    }

    @ApiOperation({summary: 'Add superhero by ID to favorite'})
    @ApiResponse({status: 200, type: User})
    @Post('/favorite')
    addToFavorite(@Body() favoriteDto: FavoriteSuperheroDto) {
        return this.superheroService.addToFavorite(favoriteDto);
    }



}

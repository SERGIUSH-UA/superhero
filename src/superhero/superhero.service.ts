import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Superhero} from "./superhero.model";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class SuperheroService {

    constructor(@InjectModel(Superhero) private heroRepository: typeof Superhero,
                private fileService: FilesService) {
    }

    async createSuperhero(dto: CreateSuperheroDto, images: [any]){
        const candidate = await this.getHeroByNickname(dto.nickname);
        if(candidate) {
            throw new HttpException('Superhero with this nickname is created', HttpStatus.BAD_REQUEST);
        }
        let fileName = '';
        for (const file in images) {
            const fileNameUpload = await this.fileService.createFile(images[file]);
            fileName = fileName + fileNameUpload + ';';
        }
        const superhero = await this.heroRepository.create({...dto, images: fileName});
        return superhero;
    }

    async getAllSuperheroes() {
        const superheros = await this.heroRepository.findAll();
        return superheros;
    }

    async getHeroByNickname(nickname: string) {
        const hero = await this.heroRepository.findOne({where: {nickname}, include: {all: true}});
        return hero;
    }
}

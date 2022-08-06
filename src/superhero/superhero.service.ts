import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Superhero} from "./superhero.model";
import {CreateSuperheroDto} from "./dto/create-superhero.dto";
import {FilesService} from "../files/files.service";
import {UsersService} from "../users/users.service";
import {FavoriteSuperheroDto} from "./dto/favorite-superhero.dto";
import {FavoriteSuperheros} from "./favorite-superheros.model";
import {User} from "../users/user.model";

@Injectable()
export class SuperheroService {

    constructor(@InjectModel(Superhero) private heroRepository: typeof Superhero,
                private userService: UsersService,
                private fileService: FilesService) {
    }

    async createSuperhero(dto: CreateSuperheroDto, images: [any]){
        const candidate = await this.getHeroByNickname(dto.nickname);
        if(candidate) {
            throw new HttpException('Superhero with this nickname is created', HttpStatus.BAD_REQUEST);
        }
        const author_candidate = await this.userService.getUserByID(dto.author_id);
        if(!author_candidate) {
            throw new HttpException('User who want creat hero doesnt registered!', HttpStatus.BAD_REQUEST);
        }
        let fileName = '';
        for (const file in images) {
            const fileNameUpload = await this.fileService.createFile(images[file]);
            fileName = fileName + fileNameUpload + ';';
        }
        let mainImage = '';
        if (fileName) {
            mainImage = fileName.split(';')[0];
        }
        const superhero = await this.heroRepository.create({...dto, images: fileName, main_image: mainImage});
        return superhero;
    }

    async getAllSuperheroes() {
        const superheros = await this.heroRepository.findAll({include: {all: true}});
        return superheros;
    }

    async getHeroByNickname(nickname: string) {
        const hero = await this.heroRepository.findOne({where: {nickname}, include: {all: true}});
        return hero;
    }

    async getOne(id: string) {
        const hero = await this.heroRepository.findByPk(id,{include: {all: true}});
        if (!hero){
            throw new HttpException(`Heros with ID ${id} does not exist`, HttpStatus.BAD_REQUEST);
        }
        return hero;
    }

    async remove(id: string) {
        const hero = await this.heroRepository.findByPk(id);
        if (!hero){
            throw new HttpException(`Hero with ID ${id} does not exist`, HttpStatus.BAD_REQUEST);
        }
        await hero.destroy();
        return hero;
    }

    async update(id: string, data, images: [any]) {
        if (data.nickname){
            const candidate = await this.getHeroByNickname(data.nickname);
            if(candidate && candidate.id !== +id) {
                throw new HttpException('Superhero with this nickname is created', HttpStatus.BAD_REQUEST);
            }
        }
        const hero = await this.heroRepository.findByPk(id);
        if (!hero){
            throw new HttpException(`Heros with ID ${id} does not exist`, HttpStatus.BAD_REQUEST);
        }
        let fileNames = hero.images;
        for (const file in images) {
            const fileNameUpload = await this.fileService.createFile(images[file]);
            fileNames = fileNames + fileNameUpload + ';';
        }
        if(data.remove_images){
            await data.remove_images.split(";").forEach((img) =>{
                if(img){
                fileNames = fileNames.replace(img + ';', '')}
            } )
        }
        if (!hero){
            throw new HttpException(`Hero with ID ${id} does not exist`, HttpStatus.BAD_REQUEST);
        }
        const [numberOfAffectedRows, [updatedHero]] = await this.heroRepository.update({ ...data, images: fileNames,
        author_id: hero.author_id}, { where: {id}, returning: true });
        return updatedHero;
    }

    async addToFavorite(favoriteDto: FavoriteSuperheroDto) {
        const hero = await this.heroRepository.findByPk(favoriteDto.superhero_id, {include: {all: true}});
        if (!hero){
            throw new HttpException(`Heros with ID ${favoriteDto.superhero_id} does not exist`,
                HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.getUserByID(favoriteDto.user_id);
        if(!user) {
            throw new HttpException('User who want creat hero doesnt registered!',
                HttpStatus.BAD_REQUEST);
        }
        let followers = hero.followers;
        if(!followers.includes(user)){
            followers = [...followers, user];
        }
        await hero.$set('followers', followers);
        const updateHero = await this.heroRepository.findByPk(favoriteDto.superhero_id, {attributes:['id',
                'nickname'], include: [{attributes:['id'], association: 'followers'}]});
        return updateHero;
    }

    async removeFromFavorite(favoriteDto: FavoriteSuperheroDto) {
        const hero = await this.heroRepository.findByPk(favoriteDto.superhero_id, {include: {all: true}});
        if (!hero){
            throw new HttpException(`Heros with ID ${favoriteDto.superhero_id} does not exist`,
                HttpStatus.NO_CONTENT);
        }
        const user = await this.userService.getUserByID(favoriteDto.user_id);
        if(!user) {
            throw new HttpException('User who want add hero to favorite doesnt registered!',
                HttpStatus.BAD_REQUEST);
        }
        let followers = hero.followers;
        if(followers.includes(user)){
            followers = followers.filter(item => item !== user);
        }
        await hero.$set('followers', followers);
        const updateHero = await this.heroRepository.findByPk(favoriteDto.superhero_id, {attributes:['id',
                'nickname'], include: [{attributes:['id'], association: 'followers'}]});
        return updateHero;
    }
}

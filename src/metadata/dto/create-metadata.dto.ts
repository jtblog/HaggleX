import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested, 
    IsObject, IsNumber, IsBase64, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ImageDTO } from '../dto/image_dto';

@InputType()
export class CreateMetaDataDTO {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    description: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    link: string;

    @Field()
    @IsObject()
    @IsOptional()
    @Type(() => ImageDTO)
    largest_image?: ImageDTO;
}
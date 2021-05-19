import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested, 
    IsObject, IsNumber, IsBase64, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionDTO } from '../dto/dimension_dto';

@InputType()
export class ImageDTO{
    @Field()
    @IsString()
    src: string;

    @Field()
    @IsString()
    @IsBase64()
    base64: string;

    @Field()
    @IsObject()
    @Type(() => DimensionDTO)
    dimension: DimensionDTO;
}
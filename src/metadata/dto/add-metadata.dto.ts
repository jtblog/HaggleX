import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class AddMetaDataDTO {
    @Field()
    @IsNotEmpty()
    id: string;

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

    @ValidateNested()
    @Field()
    @IsObject()
    @Type(() => ImageDTO)
    largest_image: ImageDTO;
}

class ImageDTO{
    @Field()
    @IsString()
    src: string;

    @Field()
    @IsString()
    base64: Buffer;

    @ValidateNested()
    @Field()
    @IsObject()
    @Type(() => DimensionDTO)
    dimension: DimensionDTO;
}

class DimensionDTO {
    @Field()
    @IsNumber()
    @IsNotEmpty()
    height: number;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    width: number;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    orientation: number;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    type: number;
}
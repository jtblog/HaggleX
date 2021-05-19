import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested, 
    IsObject, IsNumber, IsBase64, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


@InputType()
export class DimensionDTO {
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
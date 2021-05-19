import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Dimension} from './dimension';

@ObjectType()
export class Image {
    @Field()
    src: string;

    @Field()
    base64: string;

    @Field(type => Dimension)
    dimension: Dimension;
}
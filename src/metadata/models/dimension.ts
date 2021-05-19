import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dimension {
    @Field()
    height: number;

    @Field()
    width: number;

    @Field()
    orientation: number;

    @Field()
    type: number;
}
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetaDataModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  description: string;

  @Field()
  image: Image;
}

export class Image {
    @Field()
    src: string;

    @Field()
    base64: Buffer;

    @Field()
    dimension: Dimension;
}

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
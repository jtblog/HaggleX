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
  largest_image: Image;
}

class Image {
    @Field()
    src: string;

    @Field()
    base64: Buffer;

    @Field()
    dimension: Dimension;
}

class Dimension {
    @Field()
    height: number;

    @Field()
    width: number;

    @Field()
    orientation: number;

    @Field()
    type: number;
}
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Image} from './image';

@ObjectType()
export class MetaDataModel {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  description: string;

  @Field(type => Image, {nullable: true})
  largest_image?: Image;
}

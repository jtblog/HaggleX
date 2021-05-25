//import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
//import { Image} from './image';

/*
@ObjectType()
export class MetaDataModel {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  description: string;s

  @Field(type => Image, {nullable: true})
  largest_image?: Image;
}*/

export interface MetaDataModel extends InMemoryDBEntity {
  id: string;
  title: string;
  link: string;
  description: string;
  time_added: Number;
  largest_image: {
    //id: string;
    src: string;
    base64: string;
    dimension: {
      //id: string;
      height: number;
      width: number;
      orientation: number;
      type: number;
    };
  }
}

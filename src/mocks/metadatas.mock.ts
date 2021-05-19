import { MetaDataModel } from '../metadata/models/metadata.model';

export var metadatas : MetaDataModel[] = [
    {   
        title: 'PayAhead', 
        description: "Pay ahead with PayAhead", 
        link: "https://www.payahead.net",
        largest_image: { 
            dimension: { 
                height: 1080,
                orientation: 1,
                width: 1080,
                type: 7
            }, 
            base64: Buffer.alloc(0).toString('base64'),
            src: "https://"
        }
    },
    {   
        title: 'Uridium', 
        description: "Uridium description",
        link: "https://www.uridiumtechnologies.com",
        largest_image: { 
            dimension: { 
                height: 1080,
                orientation: 1,
                width: 1080,
                type: 7
            }, 
            base64: Buffer.alloc(0).toString('base64'),
            src: "https://"
        }
    },
];
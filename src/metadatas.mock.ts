import { MetaDataModel } from './metadata.model';

export var METADATAS : MetaDataModel[] = [
    {   
        id: '1',
        title: 'PayAhead', 
        description: "Pay ahead with PayAhead", 
        link: "https://www.payahead.net",
        time_added: 1621945809173,
        largest_image: { 
            dimension: { 
                //id: '1',
                height: 1080,
                orientation: 1,
                width: 1080,
                type: 7
            }, 
            //id: '1',
            base64: Buffer.alloc(0).toString('base64'),
            src: "https://"
        }
    },
    {   
        id: '2',
        title: 'Uridium', 
        description: "Uridium description",
        link: "https://www.uridiumtechnologies.com",
        time_added: 1621945682166,
        largest_image: { 
            dimension: { 
                //id: '2',
                height: 1080,
                orientation: 1,
                width: 1080,
                type: 7
            }, 
            //id: '2',
            base64: Buffer.alloc(0).toString('base64'),
            src: "https://"
        }
    },
];
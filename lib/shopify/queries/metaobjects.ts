import imageFragment from '../fragments/image';

//metaobjects that need specific order need to be updated in that order
export const getHomeAboutUsQuery = `
    query getMetaObjectsByType($type: String!) {
        metaobjects(first: 3, type: $type, sortKey: "updated_at" reverse:true) {
            edges {
                node {
                    id
                    handle
                    fields {
                        key
                        value
                        reference {
                            ... on MediaImage {
                                image {
                                    ...image
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    ${imageFragment}
`;

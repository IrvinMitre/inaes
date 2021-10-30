export interface ProductInterface {
  productId: string,
  socialEnterpriseKey: string,
  locationCoordinates:
  {
    longitude: string,
    latitude: string
  },
  whatIsIt: string,
  whereItIs: string,
  description: string,
  homeDelivery: string,
  aprovedItem: string,
  categories: Object,
  features: Object,
  tags:Object,
  pictures: Object,
  comercializations: Object,
  paymentMethods: Object,
  socialNetworks:
  [
    {
      catSocialNetwork: string,
      data: string
    }
  ]
}

export class ProductModel {
  productId: string;
  socialEnterpriseKey: string;
  locationCoordinates:
    {
      longitude: string,
      latitude: string
    };
  whatIsIt: string;
  whereItIs: string;
  description: string;
  homeDelivery: string;
  aprovedItem: string;
  categories: Object;
  features: Object;
  tags:Object;
  pictures: Object;
  comercializations: Object;
  paymentMethods: Object;
  socialNetworks:
    [
      {
        catSocialNetwork: string,
        data: string
      }
    ]
}

export interface EnterpriseInterface {
  socialEnterpriseKey: string;
  nameEnterprise: string;
  locationCoordinates: {
    longitude: string,
    latitude: string
  };
  reference: string;
  shortDescription: string;
  contact: {
    website: string,
    email:string,
    facebook: string,
    instagram: string,
    localphone: string,
    whatsapp: string
  };
  admin: {
    firstname: string,
    lastname: string,
    email: string,
    movil: string,
    password: string
  };
  createdAccount: boolean;
  addressPictures: Object;
  identityPictures: Object;
  socialNetworks: [
    {
      catSocialNetwork: string,
      data: string
    }
  ];
};
export class EnterpriseModel {
  socialEnterpriseKey: string;
  nameEnterprise: string;
  locationCoordinates: {
    longitude: string,
    latitude: string
  };
  reference: string;
  shortDescription: string;
  contact: {
    website: string,
    email:string,
    facebook: string,
    instagram: string,
    localphone: string,
    whatsapp: string
  };
  admin: {
    firstname: string,
    lastname: string,
    email: string,
    movil: string,
    password: string
  };
  createdAccount: boolean;
  addressPictures: Object;
  identityPictures: Object;
  socialNetworks: [
    {
      catSocialNetwork: string,
      data: string
    }
  ];
};

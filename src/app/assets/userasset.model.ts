export class IUserAsset {
  'USERNAME': string;
  'USER_ASSET_NAME': string;
  'USER_ASSET_TYPE': any;
}

export class UserAsset  implements IUserAsset {
  'USERNAME': string;
  'USER_ASSET_NAME': string;
  'USER_ASSET_TYPE': any;

  constructor(username: string, user_asset_name: string, user_asset_type: string) {
    this.USERNAME = username;
    this.USER_ASSET_NAME = user_asset_name;
    this.USER_ASSET_TYPE = user_asset_type;
  }

}

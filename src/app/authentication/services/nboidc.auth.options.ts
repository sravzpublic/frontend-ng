import { NbAuthOAuth2JWTToken, NbPasswordAuthStrategyOptions } from '@nebular/auth';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export class NbOIDCAuthStrategyOptions extends NbPasswordAuthStrategyOptions {
  delay? = 1000;
  alwaysFail? = false;
}

export const NBOIDCAuthStrategyOptions: NbOIDCAuthStrategyOptions = new NbOIDCAuthStrategyOptions();

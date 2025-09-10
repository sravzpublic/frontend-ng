import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NbAuthResult, NbAuthStrategy, NbAuthStrategyClass } from '@nebular/auth';
import { NBOIDCAuthStrategyOptions, NbOIDCAuthStrategyOptions } from './nboidc.auth.options';

@Injectable()
export class NbOIDCAuthStrategy extends NbAuthStrategy {

    protected defaultOptions: NbOIDCAuthStrategyOptions = NBOIDCAuthStrategyOptions;

    static setup(options: NbOIDCAuthStrategyOptions): [NbAuthStrategyClass, NbOIDCAuthStrategyOptions] {
        return [NbOIDCAuthStrategy, options];
    }

    authenticate(res?: any): Observable<NbAuthResult> {
        const module = 'login';
        const method = this.getOption(`${module}.method`);
        const url = this.getActionEndpoint(module);
        const requireValidToken = this.getOption(`${module}.requireValidToken`);
        return observableOf(new NbAuthResult(
            true,
            res,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, res, this.options),
            this.createToken(this.getOption('token.getter')(module, res, this.options), requireValidToken)));
    }

    register(data?: any): Observable<NbAuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
        );
    }

    requestPassword(data?: any): Observable<NbAuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
        );
    }

    resetPassword(data?: any): Observable<NbAuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
        );
    }

    logout(): Observable<NbAuthResult> {

        const module = 'logout';
        const method = this.getOption(`${module}.method`);
        const url = this.getActionEndpoint(module);
        return observableOf(new NbAuthResult(
            true,
            {},
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption('messages.getter')(module, {}, this.options)));
      }

    refreshToken(data?: any): Observable<NbAuthResult> {
        return observableOf(this.createDummyResult(data))
            .pipe(
                delay(this.getOption('delay')),
        );
    }

    protected createDummyResult(data?: any): NbAuthResult {

        if (this.getOption('alwaysFail')) {
            return new NbAuthResult(
                false,
                this.createFailResponse(data),
                null,
                ['Something went wrong.'],
            );
        }

        try {
            const token = this.createToken('test token', true);
            return new NbAuthResult(
                true,
                this.createSuccessResponse(data),
                '/',
                [],
                ['Successfully logged in.'],
                token,
            );
        } catch (err) {
            return new NbAuthResult(
                false,
                this.createFailResponse(data),
                null,
                [err.message],
            );
        }


    }
}
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map, catchError } from 'rxjs/operators';
import { SettingsService } from './common/settings.service';
import { SocketData, SocketPortfolio } from './app.module';
import { IAnalyticsCacheItem, IAnalyticsTopics, IRealtimeQuote } from './analytics.model';
import { PersistanceService } from './common/persistance.service';
import { AWSService } from './aws.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { RxjsHelperService } from './common/rxjs.helper.service';
import { IAsset, IExchangeAsset } from './assets/asset.model';
import { LoaderService } from './loader/loader.service';

@Injectable()
export class AnalyticsService {
    public messages: Subject<string>;
    public TOPIC_GET_RETURNS_TEAR_SHEET = 'get_returns_tear_sheet';
    /* Use this topic for everything in future */
    public TOPIC_PCA = 'pca';
    public TOPIC_RUST = 'rust_backend';
    public ANALYTICS_CACHE_KEY = 'ANALYTICS_CACHE_KEY';
    public topics: any;
    public AssetAnalyticsTypesToMessageIDMapping: any;
    public PortfolioAnalyticsTypesToMessageIDMapping: any;
    public realtimeQuotesData: BehaviorSubject<any>;
    public realtimeQuotesDataArray: IRealtimeQuote[];
    public realtimeQuotesDataCache: any;
    public retryCount = 3;

    public ID_MESSAGE_MAPPING = {
        1.1: 'Asset rolling statistics',
        6.2: 'PCA',
        9.1: 'Get combined charts',
        13: 'Asset details',
        14: 'Asset returns tear sheet',
        15: 'Portfolio returns tear sheet',
        16: 'Timeseries analysis',
        17: 'Portfolio timeseries analysis',
        18: 'Bayesian analysis',
        19.1: 'Stock prediction: Prophet Model',
        19.2: 'Stock prediction: Evaluate Prediction',
        19.3: 'Stock prediction: Change Point Prior Analysis',
        19.4: 'Stock prediction: Change Point Prior Validation',
        19.5: 'Stock prediction: Create Prediciton with change point',
        19.6: 'Stock prediction: Predict Future',
        20.1: 'Portfolio prediction: Prophet Model',
        20.2: 'Portfolio prediction: Evaluate Prediction',
        20.3: 'Portfolio prediction: Change Point Prior Analysis',
        20.4: 'Portfolio prediction: Change Point Prior Validation',
        20.5: 'Portfolio prediction: Create Prediciton with change point',
        20.6: 'Portfolio prediction: Predict Future',
        21: 'Covariance Analysis',
        21.1: 'Covariance Analysis User Asset',
        22: 'Tearsheet',
        49: 'Spread Analysis'
    };

    public MESSAGE_IDS = {
        'respond_to_ping': 0,
        'STATS_ENGINE.get_dickey_fuller_stats': 1,
        'STATS_ENGINE.get_historical_rolling_stats_by_week': 2,
        'STATS_ENGINE.get_historical_rolling_stats_by_month': 3,
        'STATS_ENGINE.get_historical_rolling_stats_by_year': 4,
        'STATS_ENGINE.get_rollingstats_tear_sheet': 1.1,
        'PCA_ENGINE.get_scatter_plot_daily_return': 5,
        'PCA_ENGINE.get_pca_components': 6,
        'PCA_ENGINE.get_pca_components_vs_index_returns': 6.1,
        'PCA_ENGINE.create_portfolio_pca_report': 6.2,
        'PCA_ENGINE.get_covariance_matrix': 7,
        'RISK_ENGINE.get_risk_stats': 8,
        'CHARTS_ENGINE.get_combined_chart': 9,
        'CHARTS_ENGINE.get_combined_chart_image': 9.1,
        'STATS_ENGINE.get_rolling_stats_by_sravz_id': 10,
        'STATS_ENGINE.get_df_test_by_sravz_id': 11,
        'STATS_ENGINE.get_rolling_stats_by_sravz_id_timeframe': 12,
        'STATS_ENGINE.get_df_stats_by_sravz_id': 13,
        'RISK_ENGINE.get_returns_tear_sheet': 14,
        'PORTFOLIO_ENGINE.create_portfolio_returns_tear_sheet': 15,
        'TIMESERIES_ENGINE.get_ts_analysis': 16,
        'PORTFOLIO_ENGINE.portfolio_returns_timeseries_analysis': 17,
        'RISK_ENGINE.get_bayesian_tear_sheet': 18,
        'RISK_ENGINE.get_stocker_tear_sheet_create_prophet_model': 19.1,
        'RISK_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction': 19.2,
        'RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis': 19.3,
        'RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation': 19.4,
        'RISK_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point': 19.5,
        'RISK_ENGINE.get_stocker_tear_sheet_predict_future': 19.6,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prophet_model': 20.1,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction': 20.2,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis': 20.3,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation': 20.4,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point': 20.5,
        'PORTFOLIO_ENGINE.get_stocker_tear_sheet_predict_future': 20.6,
        'PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet': 21,
        'PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet_user_asset': 21.1,
        'CHARTS_ENGINE.get_crypto_tearsheet': 22,
        'spread.perform_spread_analysis_for_assets': 49,
        'RUST_BACKEND_LEVERAGED_FUNDS': 1,
        'RUST_BACKEND_LLM': 2,
        'RUST_BACKEND_EARNINGS': 3,
    };

    constructor(private wsService: WebsocketService,
        private socketService: SocketPortfolio,
        private socketDataService: SocketData,
        private settingsService: SettingsService,
        private persistanceService: PersistanceService,
        private awsService: AWSService,
        private toastrService: ToastrService,
        private sanitizer: DomSanitizer,
        private http: HttpClient,
        private rxjsHelperService: RxjsHelperService,
        private loaderService: LoaderService) {

        this.realtimeQuotesDataArray = [];
        this.realtimeQuotesData = new BehaviorSubject({});
        this.realtimeQuotesDataCache = {};

        /* Based on the analytics type the IDs in the value are sent */
        this.AssetAnalyticsTypesToMessageIDMapping = {
            'Time Series Analysis': [this.MESSAGE_IDS['TIMESERIES_ENGINE.get_ts_analysis']],
            'Rolling Statistics': [this.MESSAGE_IDS['STATS_ENGINE.get_rollingstats_tear_sheet']],
            'Pyfolio Returns Analysis': [this.MESSAGE_IDS['RISK_ENGINE.get_returns_tear_sheet']],
            'Prophet Model Analysis': [this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prophet_model'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_predict_future']],
            'Covariance Analysis': [this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet_user_asset']],
            'LLM': [this.MESSAGE_IDS['RUST_BACKEND_LLM']]
        };

        /* Ensure message ID mapping is a list */
        this.PortfolioAnalyticsTypesToMessageIDMapping = {
            'PCA Analysis': [this.MESSAGE_IDS['PCA_ENGINE.create_portfolio_pca_report']],
            'Time Series Analysis': [this.MESSAGE_IDS['PORTFOLIO_ENGINE.portfolio_returns_timeseries_analysis']],
            'Pyfolio Returns Analysis': [this.MESSAGE_IDS['PORTFOLIO_ENGINE.create_portfolio_returns_tear_sheet']],
            'Prophet Model Analysis': [this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prophet_model'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_predict_future']],
            'Covariance Analysis': [this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet']],
            'Leveraged Funds': [this.MESSAGE_IDS['RUST_BACKEND_LEVERAGED_FUNDS']],
            'Earnings': [this.MESSAGE_IDS['RUST_BACKEND_EARNINGS']]
        };

        if (!this.persistanceService.getStorage('ANALYTICS_CACHE_KEY')) {
            this.persistanceService.setStorage('ANALYTICS_CACHE_KEY', {}, null);
        }

        this.messages = <Subject<string>>this.wsService
            .connect(this.settingsService.getAppConstants().analyticsSocketServiceBaseUri + '/ws')
            .pipe(map((response: MessageEvent): string => {
                return response.data;
            }));

        // BehaviorSubject in RxJS Explained
        // A BehaviorSubject is a special type of Subject in RxJS that:

        // Stores the current value.
        // Emits the last stored value to new subscribers immediately upon subscription.
        // Key Features of BehaviorSubject
        // Requires an initial value when created.
        // Always holds the latest value.
        // New subscribers receive the last emitted value immediately.
        // Works well for state management in reactive programming.


        this.topics = {
            'get_df_stats_by_sravz_id': new BehaviorSubject<IAnalyticsCacheItem>(null),
            'get_returns_tear_sheet': new BehaviorSubject<IAnalyticsCacheItem>(null),
            'pca': new BehaviorSubject<IAnalyticsCacheItem>(null),
            'rust_backend': new BehaviorSubject<IAnalyticsCacheItem>(null)
        };


        this.socketService.on(this.TOPIC_RUST, (data) => {
            this.loaderService.isLoading.next(false);
            if (data && data.e === '' && data['d_o'] && (Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url') || data.d_o)) {
                let finalData = null;
                let finalMessage = '';
                switch (data.id) {
                    case this.MESSAGE_IDS['RUST_BACKEND_LEVERAGED_FUNDS']:
                    case this.MESSAGE_IDS['RUST_BACKEND_EARNINGS']:
                    case this.MESSAGE_IDS['RUST_BACKEND_LLM']: {
                        finalData = data.d_o.signed_url;
                        finalMessage = `Received: ${this.ID_MESSAGE_MAPPING[data.id]} for ${JSON.stringify(data.p_i.args)}`;
                        if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                            this.toastrService.success(finalMessage, null, {
                                positionClass: 'toast-bottom-center'
                            });
                        }
                        this.PutInCache({
                            id: data.id, topic: this.TOPIC_RUST, args: data.p_i.args, kwargs: data.p_i.kwargs,
                            message: finalMessage, data: finalData
                        });
                        break;
                    }
                    default: {
                        // Data uploaded to AWS
                        if (Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url')) {
                            this.awsService.getData(data.d_o.signed_url, true).subscribe(awsS3Data => {
                                switch (data.id) {
                                    case this.MESSAGE_IDS['RUST_BACKEND_LEVERAGED_FUNDS']:
                                    case this.MESSAGE_IDS['RUST_BACKEND_EARNINGS']: {
                                        finalData = awsS3Data;
                                        finalMessage = `Received: data from backend ${data.p_i.args}`;
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                                // Put data in cache
                                if (finalData) {
                                    if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                                        this.toastrService.success(finalMessage, null, {
                                            positionClass: 'toast-bottom-center'
                                        });
                                    }
                                    this.PutInCache({
                                        id: data.id, topic: this.TOPIC_RUST, args: data.p_i.args, kwargs: data.p_i.kwargs,
                                        message: finalMessage, data: finalData
                                    });
                                } else {
                                    this.toastrService.error(`Data error: ${this.ID_MESSAGE_MAPPING[data.id]} - ${data.p_i.args}`, null, {
                                        positionClass: 'toast-bottom-center'
                                    });
                                }

                            });
                            // }
                            // Dataframe received
                        } else if (data.d_o) {
                            // Received a dataframe.
                            finalMessage = `Received: combined chart map data ${data.p_i.args}`;
                            finalData = data.d_o;
                            if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                                this.toastrService.success(finalMessage, null, {
                                    positionClass: 'toast-bottom-center'
                                });
                            }
                            /* Puts in cache and notifies subscribers */
                            this.PutInCache({
                                id: data.id, topic: this.TOPIC_RUST, args: data.p_i.args, kwargs: data.p_i.kwargs,
                                message: finalMessage, data: finalData
                            });
                        }
                    }
                }
            } else {
                this.toastrService.error(`Data Not Found: ${this.ID_MESSAGE_MAPPING[data.id]} - ${data.p_i.args}`, null, {
                    positionClass: 'toast-bottom-center'
                });
            }
        });


        this.socketService.on(this.TOPIC_PCA, (data) => {
            this.loaderService.isLoading.next(false);
            if (data && data.e === '' && data['d_o'] && (Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url') || data.d_o)) {
                let finalData = null;
                let finalMessage = '';
                switch (data.id) {
                    case 1.1:
                    case 14:
                    case 15:
                    case 6.2:
                    case this.MESSAGE_IDS['TIMESERIES_ENGINE.get_ts_analysis']:
                    case 17:
                    case 18:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prophet_model']:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction']:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis']:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation']:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point']:
                    case this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_predict_future']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prophet_model']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_predict_future']:
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet']:
                    case this.MESSAGE_IDS['spread.perform_spread_analysis_for_assets']: // Do nothing since we are getting image URL
                    // TODO: why separate case for crypto_tearsheet?
                    case this.MESSAGE_IDS['CHARTS_ENGINE.get_crypto_tearsheet']: {
                        finalData = data.d_o.signed_url;
                        finalMessage = `Received: ${this.ID_MESSAGE_MAPPING[data.id]} for ${JSON.stringify(data.p_i.args)}`;
                        if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                            this.toastrService.success(finalMessage, null, {
                                positionClass: 'toast-bottom-center'
                            });
                        }
                        this.PutInCache({
                            id: data.id, topic: this.TOPIC_PCA, args: data.p_i.args, kwargs: data.p_i.kwargs,
                            message: finalMessage, data: finalData
                        });
                        break;
                    }
                    case this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet_user_asset']: {
                        if (Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url')) {
                            this.awsService.getInnerHTML(data.d_o.signed_url).subscribe(innerHtml => {
                                finalData = innerHtml;
                                //finalData = this.sanitizer.bypassSecurityTrustHtml(awsS3Data);
                                finalMessage = `Received: Covariance matrix for user asset ${data.p_i.args}`;
                                if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                                    this.toastrService.success(finalMessage, null, {
                                        positionClass: 'toast-bottom-center'
                                    });
                                }
                                this.PutInCache({
                                    id: data.id, topic: this.TOPIC_PCA, args: data.p_i.args, kwargs: data.p_i.kwargs,
                                    message: finalMessage, data: finalData
                                });
                            })
                        }
                        break;
                    }
                    default: {
                        // Data uploaded to AWS
                        if (Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url')) {
                            this.awsService.getData(data.d_o.signed_url, true).subscribe(awsS3Data => {
                                switch (data.id) {
                                    case 5: {
                                        finalData = awsS3Data.scatter_plot;
                                        finalMessage = `Received: scatter plot for ${data.p_i.args}`;
                                        break;
                                    }
                                    case 6: {
                                        finalData = awsS3Data.explained_variance_fig;
                                        finalMessage = `Received: explained variance for ${data.p_i.args}`;
                                        break;
                                    }
                                    case 6.1: {
                                        finalData = awsS3Data.pc_returns_vs_index_returns_fig;
                                        finalMessage = `Received: PC1 vs Index returns for ${data.p_i.args}`;
                                        break;
                                    }
                                    case this.MESSAGE_IDS['CHARTS_ENGINE.get_combined_chart_image']: {
                                        finalData = awsS3Data;
                                        finalMessage = `Received: combined chart for ${data.p_i.args}`;
                                        break;
                                    }
                                    case 7: {
                                        finalData = this.sanitizer.bypassSecurityTrustHtml(awsS3Data.covarince_matrix_html);
                                        finalMessage = `Received: Covariance matrix for ${data.p_i.args}`;
                                        break;
                                    }
                                    case 13: {
                                        awsS3Data = JSON.parse(awsS3Data);
                                        finalData = [];
                                        for (let _i = 0; _i < awsS3Data.data.length; _i++) {
                                            let stat = null;
                                            stat = {
                                                Stat: awsS3Data.index[_i]
                                            };
                                            for (let _q = 0; _q < awsS3Data.columns.length; _q++) {
                                                stat[awsS3Data.columns[_q]] = awsS3Data.data[_i][_q];
                                            }
                                            finalData.push(stat);

                                        }
                                        finalMessage = `Received: Asset details for ${data.p_i.args}`;
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                                // Put data in cache
                                if (finalData) {
                                    if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                                        this.toastrService.success(finalMessage, null, {
                                            positionClass: 'toast-bottom-center'
                                        });
                                    }
                                    this.PutInCache({
                                        id: data.id, topic: this.TOPIC_PCA, args: data.p_i.args, kwargs: data.p_i.kwargs,
                                        message: finalMessage, data: finalData
                                    });
                                } else {
                                    this.toastrService.error(`Data error: ${this.ID_MESSAGE_MAPPING[data.id]} - ${data.p_i.args}`, null, {
                                        positionClass: 'toast-bottom-center'
                                    });
                                }

                            });
                            // }
                            // Dataframe received
                        } else if (data.d_o) {
                            // Received a dataframe.
                            finalMessage = `Received: combined chart map data ${data.p_i.args}`;
                            finalData = data.d_o;
                            if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                                this.toastrService.success(finalMessage, null, {
                                    positionClass: 'toast-bottom-center'
                                });
                            }
                            /* Puts in cache and notifies subscribers */
                            this.PutInCache({
                                id: data.id, topic: this.TOPIC_PCA, args: data.p_i.args, kwargs: data.p_i.kwargs,
                                message: finalMessage, data: finalData
                            });
                        }
                    }
                }
            } else {
                this.toastrService.error(`Data Not Found: ${this.ID_MESSAGE_MAPPING[data.id]} - ${data.p_i.args}`, null, {
                    positionClass: 'toast-bottom-center'
                });
            }
        });


        this.socketService.on(this.TOPIC_GET_RETURNS_TEAR_SHEET, (data) => {
            this.loaderService.isLoading.next(false);
            if (data && data.e === '' && data['d_o'] && Object.prototype.hasOwnProperty.call(data, 'd_o.signed_url')) {
                this.awsService.getData(data.d_o.signed_url, false).subscribe(awsS3Data => {
                    if (!awsS3Data.returns_tear_sheet) {
                        if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification'))
                            this.toastrService.info('Returns tear sheet not found', null, {
                                positionClass: 'toast-bottom-center'
                            });
                    }
                    if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification')) {
                        this.toastrService.success(`Received: Asset returns tear sheet for ${data.p_i.args}`, null, {
                            positionClass: 'toast-bottom-center'
                        });
                    }
                    this.PutInCache({
                        id: data.id, topic: this.TOPIC_GET_RETURNS_TEAR_SHEET, args: data.p_i.args, kwargs: {},
                        message: `Asset returns tear sheet for ${data.p_i.args}`, data: awsS3Data.returns_tear_sheet
                    });
                });
            } else {
                this.toastrService.error('Requested returns tear sheet not found', null, {
                    positionClass: 'toast-bottom-center'
                });
            }
        });
    }

    getObjectFromList(obj: IAnalyticsCacheItem, list: IAnalyticsCacheItem[]) {
        let i;
        if (obj && list) {
            for (i = 0; i < list.length; i++) {
                const toCompare = list[i];
                if (obj.id === toCompare.id &&
                    JSON.stringify(obj.args) === JSON.stringify(toCompare.args) &&
                    obj.topic === toCompare.topic &&
                    JSON.stringify(obj.kwargs) === JSON.stringify(toCompare.kwargs)
                ) {
                    return toCompare;
                }
            }
        }
        return null;
    }

    /* Get message key from given input message */
    getMessageKey(analyticsCacheKeyItem: IAnalyticsCacheItem) {
        // Sort kwargs object keys to ensure consistent order
        const sortedKwargs = analyticsCacheKeyItem.kwargs ?
            Object.keys(analyticsCacheKeyItem.kwargs)
                .sort()
                .reduce((obj, key) => {
                    obj[key] = analyticsCacheKeyItem.kwargs[key];
                    return obj;
                }, {}) :
            {};

        return `${JSON.stringify(analyticsCacheKeyItem.id)}-${JSON.stringify(analyticsCacheKeyItem.args)}-${JSON.stringify(analyticsCacheKeyItem.topic)}-${JSON.stringify(sortedKwargs)}`
    }

    /* Cache object based on message ID, stringify(args), stringify(kwargs) */
    findInCache(analyticsCacheKeyItem: IAnalyticsCacheItem) {
        //return this.getObjectFromList(analyticsCacheKeyItem,
        //    this.persistanceService.getStorage('ANALYTICS_CACHE_KEY'));
        let cacheData = this.persistanceService.getStorage('ANALYTICS_CACHE_KEY');
        if (cacheData) {
            return cacheData[this.getMessageKey(analyticsCacheKeyItem)];
        }
    }

    PutInCache(analyticsCacheKeyItem: IAnalyticsCacheItem) {
        let cacheData = this.persistanceService.getStorage('ANALYTICS_CACHE_KEY');
        if (!cacheData) {
            cacheData = {};
        }
        /* Created stringified message key */
        cacheData[this.getMessageKey(analyticsCacheKeyItem)] = analyticsCacheKeyItem;
        // cacheData.push(analyticsCacheKeyItem);
        /* Save to storage with expiry at midnight */
        try {
            this.persistanceService.setStorage('ANALYTICS_CACHE_KEY', cacheData, null);
        } catch {
            // Ignore error
        }
        this.NotifySubscribers(analyticsCacheKeyItem);
    }

    NotifySubscribers(analyticsCacheKeyItem: IAnalyticsCacheItem) {
        this.topics[analyticsCacheKeyItem.topic].next(analyticsCacheKeyItem);
    }

    getFromCacheOrSendRequest(analyticsCacheKeyItem: IAnalyticsCacheItem) {
        /* Set message defaults */
        /* Default device to mobile */
        if (!analyticsCacheKeyItem.kwargs.hasOwnProperty('device')) {
            analyticsCacheKeyItem.kwargs['device'] = 'mobile';
        }
        /* Default do not upload to aws */
        if (!analyticsCacheKeyItem.kwargs.hasOwnProperty('upload_to_aws')) {
            analyticsCacheKeyItem.kwargs['upload_to_aws'] = true;
        }
        /* Send empty array always */
        if (!analyticsCacheKeyItem.args) {
            analyticsCacheKeyItem.args = [];
        }

        const response = this.findInCache(analyticsCacheKeyItem);

        if (!response) {
            if (this.persistanceService.get('notification') != null && this.persistanceService.get('notification'))
                this.toastrService.info(`Requested: ${analyticsCacheKeyItem.message}`, null, {
                    positionClass: 'toast-bottom-center'
                });
            // Retry retryCount times with exponential back-off
            // Socket messages are not recieved sometimes, retry
            for (let i = 0; i < this.retryCount; i++) {
                setTimeout(() => {
                    if (!this.findInCache(analyticsCacheKeyItem)) {
                        this.socketService.emit(analyticsCacheKeyItem.topic, JSON.stringify(
                            {
                                'args': analyticsCacheKeyItem.args,
                                'kwargs': analyticsCacheKeyItem.kwargs,
                                'messageid': analyticsCacheKeyItem.id
                            }));
                        this.loaderService.isLoading.next(true);
                    }
                }, i * 20000);
            }
            return null;
        } else {
            return response;
        }
    }

    getAssetDetails(sravzid, messageids) {
        const requestMessages: Array<IAnalyticsCacheItem> = [];
        /* Check why do we need to filter the message IDs here. Added new message IDs here */
        for (const item of [1.1, 14,
            this.MESSAGE_IDS['TIMESERIES_ENGINE.get_ts_analysis'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prophet_model'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point'],
            this.MESSAGE_IDS['RISK_ENGINE.get_stocker_tear_sheet_predict_future'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet_user_asset']
        ]) {
            if (messageids && !messageids.some(e => e === item)) {
                continue;
            }
            requestMessages.push(
                {
                    id: item, topic: this.TOPIC_PCA, args: [sravzid], kwargs: {},
                    message: `${this.ID_MESSAGE_MAPPING[item]} for ${sravzid}`, data: null
                }
            );
        }
        this.sendMessage(requestMessages);
    }

    getIndexComponentsURL(sravzid) {
        return this.http.get<string>(`${this.settingsService.getAppConstants().analyticsServiceBaseUri}/api/indexcomponents/${sravzid}`)
            .pipe(catchError(this.rxjsHelperService.handleError<string>('getIndexComponentsURL', null)));
    }

    getIndexComponents(sravzid) {
        return this.http.get<IAsset[]>(`${this.settingsService.getAppConstants().analyticsServiceBaseUri}/api/indexcomponentsbysravzid/${sravzid}`)
            .pipe(catchError(this.rxjsHelperService.handleError<string>('getIndexComponents', null)));
    }

    getExchangeComponents(sravzid) {
        return this.http.get<IExchangeAsset[]>(`${this.settingsService.getAppConstants().analyticsServiceBaseUri}/api/exchangecomponentsbysravzid/${sravzid}`)
            .pipe(catchError(this.rxjsHelperService.handleError<string>('getExchangeComponents', null)));
    }

    getPortfolioTearSheets(name, user_id, messageids) {
        // backend-py messages
        const requestMessages: IAnalyticsCacheItem[] = [];
        for (const item of [
            this.MESSAGE_IDS['PCA_ENGINE.create_portfolio_pca_report'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.create_portfolio_returns_tear_sheet'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.portfolio_returns_timeseries_analysis'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prophet_model'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_evaluate_prediction'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_analysis'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_change_point_prior_validation'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_create_prediciton_with_change_point'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_stocker_tear_sheet_predict_future'],
            this.MESSAGE_IDS['PORTFOLIO_ENGINE.get_correlation_analysis_tear_sheet'],
            this.MESSAGE_IDS['RUST_BACKEND_LEVERAGED_FUNDS'],
        ]) {
            if (messageids && !messageids.some((e: number) => e === item)) {
                continue;
            }
            let message: IAnalyticsCacheItem = {
                id: item,
                topic: this.TOPIC_PCA,
                args: [name, user_id],
                kwargs: {},
                message: `${this.ID_MESSAGE_MAPPING[item]} for ${name}`,
                data: null,
            };
            // Update the topic to RUST topic for RUST messages
            if (item == this.MESSAGE_IDS['RUST_BACKEND_LEVERAGED_FUNDS']) {
                message.topic = this.TOPIC_RUST;
                message.args = name;
            }
            requestMessages.push(message);
        }
        this.sendMessage(requestMessages);
    }

    getTearSheet(args, messageId) {
        const requestMessages: IAnalyticsCacheItem[] = [];
        requestMessages.push(
            {
                id: messageId, topic: this.TOPIC_PCA, args: args, kwargs: {},
                message: `${this.ID_MESSAGE_MAPPING[messageId]}`, data: null
            }
        );
        this.sendMessage(requestMessages);
    }

    getCombinedChart(sravzids) {
        const requestMessages: IAnalyticsCacheItem[] = [
            {
                id: 9.1, topic: this.TOPIC_PCA, args: [sravzids], kwargs: { 'device': 'mobile', 'upload_to_aws': true },
                message: `Combined chart for ${sravzids}`, data: null
            },
            {
                id: 9.1, topic: this.TOPIC_PCA, args: [sravzids], kwargs: { 'device': 'pc', 'upload_to_aws': true },
                message: `Combined chart for ${sravzids}`, data: null
            },
        ];
        this.sendMessage(requestMessages);
    }

    /* For Rust args should be a single string, implement *args, **kwargs in RUST */
    sendMessageToNSQ(id, topic, args, kwargs, message) {
        const requestMessages: IAnalyticsCacheItem[] = [
            {
                id: id,
                topic: topic,
                args: args,
                kwargs: kwargs,
                message: message,
                data: null
            }
        ];
        this.sendMessage(requestMessages);
    }

    sendMessage(requestMessages) {
        for (const message of requestMessages) {
            const data = this.getFromCacheOrSendRequest(message);
            if (data) {
                this.topics[message.topic].next(data);
            }
        }
    }

    processRealTimeQuote(msg: string) {
        const quote: IRealtimeQuote = JSON.parse(msg);
        switch (quote.ty) {
            case 'c':
                quote.ty = 'Crypto';
                break;
            case 'u':
                quote.ty = 'Stock';
                break;
            case 'f':
                quote.ty = 'Forex';
                break;
            case 'i':
                quote.ty = 'Index';
                if (!Number.isNaN(quote.t)) {
                    quote.t = quote.t * 1000; // Convert to milli seconds
                }
                break;
            case 'a':
                quote.ty = 'Futures';
                if (!Number.isNaN(quote.t)) {
                    quote.t = quote.t * 1000; // Convert to milli seconds
                }
                break;
            default:
                break;
        }
        quote.id = quote.s;
        if (!Number.isNaN(quote.dc)) {
            quote.dc = quote.dc / 100;
        }
        if (this.realtimeQuotesDataCache.hasOwnProperty(quote.s)) {
            const quoteObj = this.realtimeQuotesDataCache[quote.s] as IRealtimeQuote;
            quoteObj.id = quote.id;
            quoteObj.t = quote.t;
            quoteObj.s = quote.s;
            quoteObj.p = quote.p;
            quoteObj.v = quote.v;
            quoteObj.q = quote.q;
            quoteObj.a = quote.a;
            quoteObj.ap = quote.ap;
            quoteObj.bp = quote.bp;
            quoteObj.as = quote.ap;
            quoteObj.bs = quote.bs;
            quoteObj.dc = quote.dc
            quoteObj.dd = quote.dd;
            quoteObj.ppms = quote.ppms;
            this.realtimeQuotesData.next({
                "type": "update",
                "quote": quoteObj
            });

        } else {
            this.realtimeQuotesDataCache[quote.s] = quote;
            if (quote.s != "") {
                this.realtimeQuotesDataArray.push(quote);
            }

            this.realtimeQuotesData.next({
                "type": "insert",
                "quote": quote
            });

        }
    }

    subscribeToRealTimeQuote() {
        if (this.socketDataService) {
            this.socketDataService.emit('subscribe', 'realtime-quotes-room');
            this.socketDataService.on('realtime-quotes-room', (msg: string) => { this.processRealTimeQuote(msg); });
        }
    }

    unsubscribeToRealTimeQuote() {
        if (this.socketDataService) {
            this.socketDataService.emit('unsubscribe', 'realtime-quotes-room');
            this.socketDataService.removeAllListeners('realtime-quotes-room');
            // Empty the cache and the array such that when the view is back active, we get fresh quotes.
            this.realtimeQuotesDataCache = {};
            this.realtimeQuotesDataArray = [];
        }
    }
}


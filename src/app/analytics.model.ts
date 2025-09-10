import { BehaviorSubject } from 'rxjs';

export interface IAnalyticsCacheItem {
  'id': number;
  'topic': string;
  'args': any[];
  'kwargs': any;
  'message': string;
  'data': any;
  'message_key'?: string;
}

export interface IAnalyticsTopics {
  'name': string;
  'topic': BehaviorSubject<any>;
}

export interface IRealtimeQuote {
  id: string;
  ty: string;
  s: string;
  p: number;
  v: number;
  q: number;
  a: number;
  ap: number;
  bp: number;
  as: number;
  bs: number;
  dc: number;
  dd: number;
  ppms: boolean;
  t: number;
}

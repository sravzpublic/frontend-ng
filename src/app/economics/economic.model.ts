export interface IEvent {
  'date': Date;
  'event': string;
  'country': string;
  'eventtime': string;
  'for': string;
  'actual': string;
  'marketexpectation': string;
  'priortothis': string;
  'revisedfrom': string;
}


export interface IEconomicEvent {
  date: Date;
  type: string;
  actual?: any;
  change?: any;
  change_percentage?: any;
  comparison: string;
  country: string;
  estimate: number;
  period?: any;
  previous: number;
}


export interface IUsFedCalendar {
  events: Event[]
  announcement: Announcement[]
}

export interface Event {
  description?: string
  live?: string
  location?: string
  title: string
  time: string
  month: string
  days: string
  type: string
  date: Date
  link?: string
}

export interface Announcement {
  title?: string
  month?: string
  day?: string
  type?: string
}

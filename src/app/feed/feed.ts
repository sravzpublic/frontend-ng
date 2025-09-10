import { FeedInfo } from './feed-info';
import { FeedEntry } from './feed-entry';

export interface Feed {
  status: string;
  feed: FeedInfo;
  items: Array<FeedEntry>;
}


export interface Link {
  href: string;
  rel: string;
  type: string;
}

export interface SummaryDetail {
  base: string;
  language?: any;
  type: string;
  value: string;
}

export interface TitleDetail {
  base: string;
  language?: any;
  type: string;
  value: string;
}

export interface Sentiment {
  neg: number;
  neu: number;
  pos: number;
  compound: number;
}

export interface IRSSFeedEntry {
  _id: string;
  datetime: Date;
  guidislink: boolean;
  id: string;
  link: string;
  links: Link[];
  metadata_id: string;
  metadata_sponsored: string;
  metadata_type: string;
  published: string;
  published_parsed: number[];
  sentiment: Sentiment;
  summary: string;
  summary_detail: SummaryDetail;
  title: string;
  title_detail: TitleDetail;
}

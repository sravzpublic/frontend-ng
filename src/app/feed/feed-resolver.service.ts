import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FeedService } from './feed.service';
import { LeftClipper } from 'igniteui-angular-core';
import { environment } from '../../environments/environment';

@Injectable()
export class FeedResolver  {
  constructor(private feedService: FeedService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const fromDate = new Date((new Date()).getTime() - (environment.rss_feeds_default_days * 24 * 60 * 60 * 1000));
    const toDate = new Date();
    return this.feedService.getRSSFeedEntriesS3Url(fromDate, toDate);
  }
}

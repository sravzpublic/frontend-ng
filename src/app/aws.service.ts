import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable()
export class AWSService {
  constructor (
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) {}

  getData(url: string, convert_to_json: boolean) {
    let options = {}
    if (!convert_to_json) {
      const headers = new HttpHeaders({
        'Content-Type':  'text/plain',
      });      
      options = {
        headers,
        responseType: 'text' as 'json'
      };
    }
    return this.http.get<any>(url, options);
  }

  getInnerHTML(url: string) {
    const headers = new HttpHeaders({
      'Content-Type':  'text/plain',
    });
    return this.http.get(url,  {
      headers,
      responseType: 'text'
    }).pipe(
      /* Check better place to apply style */
      map(html => {
          const html_updated = html.replace(/dataframe/i, 'table');
          return this.sanitizer.bypassSecurityTrustHtml(html_updated)}
        )
    );
  }

}

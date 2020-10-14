import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static USER_KEY = 'sysinf-user';

  private DEFAULT_HEADERS = {'Content-Type': 'application/json'};

  private readonly baseUrl = 'http://localhost:8080';

  private static get authToken(): string {
    return localStorage.getItem(this.USER_KEY);
  }

  constructor(private http: HttpClient) {
  }

  public get(url: string, options?: any, ignoreBaseUrl?: boolean): Observable<HttpResponse<any>> {
    return this.http.get((ignoreBaseUrl ? '' : this.baseUrl) + url, {headers: this.requestOptions(options), observe: 'response'});
  }

  public getImage(url: string, options?: any, ignoreBaseUrl?: boolean): Observable<any> {
    return this.http.get((ignoreBaseUrl ? '' : this.baseUrl) + url,
      {
        headers: this.requestOptions(options),
        responseType: 'blob'
      });
  }

  public post(url: string, body: any, options?: any): Observable<HttpResponse<any>> {
    return (this.http.post(this.baseUrl + url, body, {headers: this.requestOptions(options), observe: 'response'}));
  }

  public put(url: string, body: any, options?: any): Observable<HttpResponse<any>> {
    return (this.http.put(this.baseUrl + url, body, {headers: this.requestOptions(options), observe: 'response'}));
  }

  public delete(url: string, options?: any): Observable<HttpResponse<any>> {
    return (this.http.delete(this.baseUrl + url, {headers: this.requestOptions(options), observe: 'response'}));
  }

  public patch(url: string, body: any, options?: any): Observable<HttpResponse<any>> {
    return (this.http.patch(this.baseUrl + url, body, {headers: this.requestOptions(options), observe: 'response'}));
  }

  public head(url: string, options?: any): Observable<HttpResponse<any>> {
    return (this.http.head(this.baseUrl + url, {headers: this.requestOptions(options), observe: 'response'}));
  }

  public options(url: string, options?: any): Observable<HttpResponse<any>> {
    return (this.http.options(this.baseUrl + url, {headers: this.requestOptions(options), observe: 'response'}));
  }

  private requestOptions(options?: any): HttpHeaders {
    const token = HttpService.authToken;
    if (token) {
      return new HttpHeaders({...this.DEFAULT_HEADERS, Authorization: `Bearer ${HttpService.authToken}`});
    } else {
      return new HttpHeaders({...this.DEFAULT_HEADERS});
    }
  }
}

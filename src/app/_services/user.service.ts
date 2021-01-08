import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {config} from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${config.apiBaseUrl}/all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${config.apiBaseUrl}/api/orienta/formations`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(`${config.apiBaseUrl}/mod`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${config.apiBaseUrl}/adm`, { responseType: 'text' });
  }
}

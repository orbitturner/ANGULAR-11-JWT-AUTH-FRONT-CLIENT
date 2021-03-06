import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {config} from '../config/api.config';
import {JwtHelper} from 'angular2-jwt';
import {tap} from 'rxjs/operators';


// =============' KEY IN LOCALSTORAGE '==============
const TOKEN_KEY   = 'auth-token';
const USER_KEY    = 'auth-user';
const ROLES_KEY   = 'auth-roles';
// =================================================

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // =================================================
  private loggedUserRole = 'STUDENT';
  // =================================================
  private jwtHelper = new JwtHelper();
  // =================================================
  // private state = false;
  // =================================================


  constructor(private http: HttpClient) {
  }

  /**
   * Function for Connecting User
   * to the backend and generating JWT
   *
   * @param user
   */
  // tslint:disable-next-line:typedef
  async login(user: { email: string, password: string }) {
    return await new Promise(((resolve, reject) => {
      this.http.post<any>(`${config.apiBaseUrl}/login`, user, {observe: 'response'}).subscribe(
        data => {
          const token = data.headers.get('authorization') as string;
          // TODO : REMOVE THESE
          // console.log(this.jwtHelper.decodeToken(token).sub);
          // console.log(this.jwtHelper.decodeToken(token).roles[0]);
          // console.log(data);
          if (token){
            this.saveToken(token);
            this.saveUser(token);

            resolve(true);
          }
        },
        err => {
          console.log('User Not Found');
          resolve(false);
        }
      );
    }));
  }

  /**
   * Function for Registering a new User
   *
   * @param user
   */
  register(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${config.apiBaseUrl}/login`, user);
  }

  /**
   * Disconnecting User From Both Front and Back
   */
  logout(): boolean {
    this.http.get<any>(`${config.apiBaseUrl}/logout`);
    this.signOut();
    return true;
  }

  /**
   * Verify if User is Connected
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  // =================================================
  // 🔐🔐 TOKEN MANAGER 🔐🔐
  // =================================================

  /**
   * Clears the localstorage and Disconnect the User
   * from the Front-End
   *
   */
  signOut(): void {
    localStorage.clear();
    this.reloadPage();
  }

  private reloadPage(): void {
    window.location.reload();
  }
  /**
   * Saves The Actual User JWT-Token to The LocalStorage
   *
   * @param token
   */
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Get The Token Stored in LocalStorage
   * ¤ If Exist
   */
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Stores The Connected User and His Role in the System
   *
   * @param token
   */
  public saveUser(token: any): void {
    localStorage.removeItem(USER_KEY);
    // ============================================
    /**
     * Uses the sub property in the Crypted JWT Token
     */
    localStorage.setItem(USER_KEY, this.jwtHelper.decodeToken(token).sub);
    // ============================================
    /**
     * If you got many roles for one user you need to replace this under line by this commented one :
     * localStorage.setItem(ROLES_KEY, this.jwtHelper.decodeToken(token).roles[0]);
     */
    localStorage.setItem(ROLES_KEY, this.jwtHelper.decodeToken(token).roles[0].authority);


  }

  /**
   * Get The User Stored in LocalStorage
   * ¤ If Exist
   */
  public getUser(): boolean | string {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return false;
  }

  /**
   * Get The Role of the connected User Stored in LocalStorage
   * ¤ If Exist
   */
  public getUserRole(): string | null {
    const role = localStorage.getItem(ROLES_KEY);
    if (role){
      return role;
    }
    return null;
  }
  // =================================================
  // END TOKEN MANAGEMENT
  // =================================================

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Interface } from 'readline';
// import {
//   erreurAlerteAvecTimer,
//   erreurToast,
//   showAlertError,
// } from '../global-functions';
import { throwError } from 'rxjs';
import { globalVariable } from '../global-variable';

const TOKEN_KEY = 'auth-token';
const SOCIETE_COURANTE_KEY = 'SOCIETE_COURANTE_KEY';
// const POINTVENTE_COURANTE_KEY = 'POINTVENTE_COURANTE_KEY';
// const EXERCICE_COURANTE_KEY = 'EXERCICE_COURANTE_KEY';
// const SESSION_CAISSE_COURANTE_KEY = 'SESSION_CAISSE_COURANTE_KEY';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const USER_PSEUDO_KEY = 'auth-pseudo';
const USER_KEY = 'auth-user';
const LOGO = 'logo';
// const USER_ROLE = 'auth-role';
// const ROLE_SUPER_ADMIN = '14sqqs78za879899899';
// const DISPLAYCAISSEANDSESSIONCAISSEADMIN = "DisplayCaisseANDSessionCaisseLikeAdmin"
// const lISTROLECAISSE = "listRoleCaisse"

// const lISTROLESESSIONCAISSE = "listRoleSessionCaisse"

export interface SocieteLogin {
  _id: string | null;
  raisonSociale: string | null;
  code_unique: string | null;
  // role: string | null;
  // role_libelle: string | null;
  // pointeVentes: PointVente[];
  // excercices: Excercice[];
}

// export interface Excercice {
//   _id: string | null;
//   code_unique: string | null;
//   annee_exercice: string | null;
//   timbreFiscale: string | null;
// }

// export interface PointVente {
//   _id: string | null;
//   code_unique: string | null;
//   libelle: string | null;
// }

export interface UserLogin {
  _id: string | undefined;
  // nom: string | undefined;
  libelle: string | undefined;
  profil: string | undefined;
  email: string | undefined;
  societes: SocieteLogin[];
}

// export interface session_caisse{
//   sessionCaisse: Sessions_caisse
// }

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.token = localStorage.getItem(TOKEN_KEY) as string;
    if (this.token) {
      let user: any = localStorage.getItem(USER_KEY);
      this.user = JSON.parse(user) as UserLogin;
      this.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) as string;
      let societe: any = localStorage.getItem(SOCIETE_COURANTE_KEY);
      // let point_vente: any = localStorage.getItem(POINTVENTE_COURANTE_KEY)
      // let exercice: any = localStorage.getItem(EXERCICE_COURANTE_KEY)
      this.societeCourante = JSON.parse(societe);
      // this.pointVenteCourante = JSON.parse(point_vente)
      // this.exerciceCourante = JSON.parse(exercice)
    }
  }

  private tokenExpired(token: string) {
    try {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch (e) {
      return true;
    }
  }

  public signOut() {
    localStorage.clear();
    this.token = '';
    this.refreshToken = '';
    // this.exercice = null
    this.user = null;
    // this.point_vente = null
    this.societeCourante = null;
    // this.pointVenteCourante = null
    // this.exerciceCourante = null
    this.router.navigate(['/login']);
  }

  token = '';
  refreshToken = '';
  dashboard = 'client';

  user!: UserLogin | null;
  // exercice!: Excercice | null
  // point_vente!: PointVente | null

  societeCourante: any;
  // pointVenteCourante: any
  // exerciceCourante: any
  // sessionCaisseCourante: any

  // public getSessionCaisse(): void {
  //   let result = this.sessionCaisseCourante ? this.sessionCaisseCourante : null;
  //   return result
  // }

  public getCodeSociete(): string {
    let result = this.societeCourante ? this.societeCourante.code_unique : '';
    return result;
  }

  public getSocieteRacine(): void {
    let result = this.societeCourante ? this.societeCourante._id : '';
    return result;
  }

  // public getRole(): void {
  //   let result = this.societeCourante ? this.societeCourante.role_libelle : '';
  //   return result
  // }

  // public getCodePointeVente(): string {
  //   let result = this.pointVenteCourante ? this.pointVenteCourante.code_unique : '';
  //   return result
  // }

  // public getCodeExercice(): string {
  //   let result = this.exerciceCourante ? this.exerciceCourante.code_unique : '';
  //   return result
  // }

  // public saveSessionCaisseCourante(sessionCaisseCourante: any): void {
  //   this.sessionCaisseCourante = sessionCaisseCourante;
  //   localStorage.setItem(SESSION_CAISSE_COURANTE_KEY, JSON.stringify(this.sessionCaisseCourante));
  // }

  public saveSocieteCourante(societeCourante: any): void {
    this.societeCourante = societeCourante;
    localStorage.setItem(
      SOCIETE_COURANTE_KEY,
      JSON.stringify(this.societeCourante)
    );
  }

  // public savePointVenteCourante(pointVenteCourante: any): void {
  //   this.pointVenteCourante = pointVenteCourante;
  //   localStorage.setItem(POINTVENTE_COURANTE_KEY, JSON.stringify(this.pointVenteCourante));
  // }

  // public saveExerciceCourante(exerciceCourante: any): void {
  //   this.exerciceCourante = exerciceCourante;
  //   localStorage.setItem(EXERCICE_COURANTE_KEY, JSON.stringify(this.exerciceCourante));
  // }

  public saveUser(user: any): void {
    this.user = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(TOKEN_KEY, token);
    this.setHeader();
  }

  public saveRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string | null {
    if (!this.isConnected()) {
      return null;
    }

    return this.token;
  }

  public getTokenFromLocalStorage() {
    return this.token;
  }

  public isConnected() {
    if (!this.token || this.token == '') return false;
    return true;
  }

  header: any;
  setHeader() {}

  getHeader() {
    const token: any = this.getToken();
    if (!token) {
      this.signOut();
      erreurToast("Vous n'êtes pas autorisé(e) à faire cela.");
      // If the token is null or undefined, throw an error
      return throwError(new Error('Token is null or undefined'));
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('x-refresh', `${this.refreshToken}`);

    this.header = {
      headers: headers,
    };

    return this.header;
  }

  handleErrorWithParams(errorParam?: string) {
    return (error: any) => {
      try {
        if (error.error && error.error.RESULTAT && error.error.MESSAGE)
          showAlertError(error.error.MESSAGE, error.error.RESULTAT);
        else if (error.error && error.error.RESULTAT)
          showAlertError(globalVariable.msg_erreur_titre, error.error.RESULTAT);
        else if (error.error && error.error.MESSAGE)
          showAlertError(globalVariable.msg_erreur_titre, error.error.MESSAGE);
        else if (error.error && error.status === 403) {
          erreurToast('Le token que vous avez utilisé est expiré.');
          this.signOut();
        }
      } catch (e) {
        showAlertError(globalVariable.msg_erreur_titre, '');
      }

      return throwError('Custom error message');
    };
  }
}

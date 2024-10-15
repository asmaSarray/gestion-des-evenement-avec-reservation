import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
// import {TokenService} from ''
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  REST_API = environment.baseUrl + '/evenements';
  constructor(private httpClient: HttpClient ) {}
   // Add
   AddNew(data: ServiceService): Observable<any> {
    let newdata: any = { ...data };
    // newdata.code_societe = this.tokenService.getCodeSociete()
    newdata._id = undefined
    return this.httpClient
      .post(`${this.REST_API}/new`, newdata)
      // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetAll(): Observable<any> {
    // let data = { code_societe: this.tokenService.getCodeSociete() }
    return this.httpClient.post(`${this.REST_API}/all`)
      // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetOne(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => {
        return res || {};
      }),
      // catchError(this.tokenService.handleErrorWithParams())
    );
  }
  // GetOneR(codeSociete: string, raccourci: string): Observable<any> {
  //   const requestBody = { code_societe: codeSociete, raccourci: raccourci };
  //   return this.httpClient.post(`${this.REST_API}/raccourci`, requestBody, this.tokenService.getHeader()).pipe(
  //     map((res: any) => {
  //       return res || {};
  //     }),
  //     // catchError(this.tokenService.handleErrorWithParams())
  //   );
  // }

  // getRaccourci(raccourci: string): Observable<any> {
  //   const codeSociete = this.tokenService.getCodeSociete();
  //   const requestBody = { code_societe: codeSociete, raccourci: raccourci };

  //   return this.httpClient.post(`${this.REST_API}/raccourci`, requestBody, this.tokenService.getHeader()).pipe(
  //     map((res: any) => {
  //       return res || {};
  //     }),
  //     catchError(this.tokenService.handleErrorWithParams())
  //   );
  // }


  // Update
  update(data: ServiceService): Observable<any> {
    let newdata: any = data
    // newdata.code_societe = this.tokenService.getCodeSociete()
    let API_URL = `${this.REST_API}`;
    return this.httpClient
      .put(API_URL, data)
      // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Delete
  delete(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/archive`;
    let data: any = {}
    // data.code_societe = this.tokenService.getCodeSociete()
    data._id = id
    return this.httpClient
      .put(API_URL, data)
      // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items: any) {
    let newItems = []
    for (let key of Object.keys(items)) {
      newItems.push(new ServiceService(items[key]))
    }
    return newItems
  }

  // successCreate(res: ReponseList, dialogRef: any) {
  //   if (res.OK) {
  //     dialogRef.close(res.RESULTAT);
  //   } else {
  //     showAlertError(globalVariable.msg_erreur_titre, res.RESULTAT);
  //   }
  // }

  // successUpdate(res: ReponseList, dialogRef: any) {
  //   if (res.OK) {
  //     dialogRef.close(res.RESULTAT);
  //   } else {
  //     showAlertError(globalVariable.msg_erreur_titre, res.RESULTAT);
  //   }
  // }

}

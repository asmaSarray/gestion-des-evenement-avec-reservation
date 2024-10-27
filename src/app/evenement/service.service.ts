import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { map, Observable, Subject } from 'rxjs';
import { Evenement, ReponseList } from './evenement.model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
// import { TokenService } from 'src/app/services/token.service';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  REST_API = environment.baseUrl + '/';
  constructor(private httpClient: HttpClient) {}
  // Add
  AddNew(data: Evenement): Observable<any> {
    let newdata: any = { ...data };
    newdata._id = undefined;
    return this.httpClient.post(`${this.REST_API}/`, newdata);
    // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get all objects
  GetAll(): Observable<any> {
    // let data = { code_societe: this.tokenService.getCodeSociete() }
    return this.httpClient.get(`${this.REST_API}/evenements`);
    // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  // Get single object
  GetOne(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/'evenement'${id}`;
    return this.httpClient.get(API_URL).pipe(
      map((res: any) => {
        return res || {};
      })
      // catchError(this.tokenService.handleErrorWithParams())
    );
  }

  // Update
  update(data: ServiceService): Observable<any> {
    let API_URL = `${this.REST_API}/'evenement'`;
    return this.httpClient.put(API_URL, data);
  }

  // Delete
  delete(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/evenement`;
    let data: any = {};
    // data.code_societe = this.tokenService.getCodeSociete()
    data._id = id;
    return this.httpClient.put(API_URL, data);
    // .pipe(catchError(this.tokenService.handleErrorWithParams()));
  }

  getData(items: any) {
    let newItems = [];
    for (let key of Object.keys(items)) {
      newItems.push(new ServiceService(items[key]));
    }
    return newItems;
  }
  successCreate(res: ReponseList, dialogRef: any) {
    if (res.OK) {
      dialogRef.close(res.RESULTAT);
    } else {
      // showAlertError(globalVariable.msg_erreur_titre, res.RESULTAT);
    }
  }

  successUpdate(res: ReponseList, dialogRef: any) {
    if (res.OK) {
      dialogRef.close(res.RESULTAT);
    } else {
      // showAlertError(globalVariable.msg_erreur_titre, res.RESULTAT);
    }
  }

  public allTypeDepartementObservable = new Subject<[]>();
  public allTypeDepartement = [];
  setAllTypeDepartement(allTypeDepartement: any) {
    this.allTypeDepartementObservable.next(allTypeDepartement);
    this.allTypeDepartement = allTypeDepartement;
  }
}

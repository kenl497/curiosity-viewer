import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuriosityService {

  constructor(private http: HttpClient) { }

  roverInfoUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY';
  //roverInfoUrl = 'assets/rover.json';
  rover$ = this.http.get<any>(this.roverInfoUrl).pipe(catchError(this.handleError));

  private solUrlSubject = new BehaviorSubject<any>({});
  private solUrlAction$ = this.solUrlSubject.asObservable();
  photos$ = this.solUrlAction$.pipe(
    mergeMap(param => {
      if (param.url) {
        return this.http.get<any>(param.url).pipe(
          catchError(this.handleError)
        );
      }
      return EMPTY;
    })
  );


  setSol(sol: string) {
    const photosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=DEMO_KEY`;
    //const photosUrl = 'assets/photos.json';

    this.solUrlSubject.next({ url: photosUrl });
  }

  handleError(err) {
    let errorMessage: string;
    if (err instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.message}`;
    } else {
      errorMessage = `Http Response returned code ${err.status}: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}

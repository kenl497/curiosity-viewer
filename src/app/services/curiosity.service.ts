import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuriosityService {

  constructor(private http: HttpClient) { }

  roverInfoUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY';
  //roverInfoUrl = 'assets/rover.json';
  rover$ = this.http.get<any>(this.roverInfoUrl).pipe(catchError(this.handleError));

  getPhotos(sol: number) {
    const photosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=DEMO_KEY`;
    //photosUrl = 'assets/photos.json';
    return this.http.get<any>(photosUrl).pipe(catchError(this.handleError));
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

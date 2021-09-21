import { Injectable } from '@angular/core';
import { Developer } from './developer';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {

    constructor(private http: HttpClient) { }

    private devURL = '/api/developers';

    httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

    getDevs(): Observable<any> {
        return this.http.get(this.devURL).pipe(
            catchError(this.handleError<any>('getDevs', []))
        );
    }

    getDev(id: number): Observable<any> {
	    const url = `${this.devURL}/${id}`;
	    return this.http.get<any>(url).pipe(
	        catchError(this.handleError<any>(`getDev id=${id}`))
	    );
	}

    updateDev(dev: Developer): Observable<any> {
        const url = `${this.devURL}/${dev.id}`;
	    return this.http.put(url, dev, this.httpOptions).pipe(
	        catchError(this.handleError<any>('updateDev'))
	    );
	}

	deleteDev(id: number): Observable<any> {
		const url = `${this.devURL}/${id}`;
	    return this.http.delete(url, this.httpOptions).pipe(
	        catchError(this.handleError<any>('deleteDev'))
	    );
	}

	addDev(dev: any): Observable<any> {
		return this.http.post(this.devURL, { developer: dev }, this.httpOptions).pipe(
			catchError(this.handleError<any>('deleteDev'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	    console.error(error); // log to console instead

	    return of(result as T);
	  };
	}
}

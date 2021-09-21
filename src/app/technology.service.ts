import { Injectable } from '@angular/core';
import { Technology } from './technology';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TechnologyService {

    constructor(private http: HttpClient) { }

    private techURL = '/api/technologies';

    httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

    getTechs(): Observable<any> {
        return this.http.get(this.techURL).pipe(
            catchError(this.handleError<any>('getTechs', []))
        );
    }

    getTech(id: number): Observable<any> {
	    const url = `${this.techURL}/${id}`;
	    return this.http.get<any>(url).pipe(
	        catchError(this.handleError<any>(`getTech id=${id}`))
	    );
	}

    updateTech(tech: Technology): Observable<any> {
        const url = `${this.techURL}/${tech.id}`;
	    return this.http.put(url, tech, this.httpOptions).pipe(
	        catchError(this.handleError<any>('updateTech'))
	    );
	}

	deleteTech(id: number): Observable<any> {
		const url = `${this.techURL}/${id}`;
	    return this.http.delete(url, this.httpOptions).pipe(
	        catchError(this.handleError<any>('deleteTech'))
	    );
	}

	addTech(tech: Technology): Observable<any> {
		return this.http.post(this.techURL, tech, this.httpOptions).pipe(
			catchError(this.handleError<any>('deleteTech'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	    console.error(error); // log to console instead

	    return of(result as T);
	  };
	}
}

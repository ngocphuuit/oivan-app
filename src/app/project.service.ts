import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }

    private projectURL = '/api/projects';

    httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

    getPros(): Observable<any> {
        return this.http.get(this.projectURL).pipe(
            catchError(this.handleError<any>('getPros', []))
        );
    }

    getPro(id: number): Observable<any> {
	    const url = `${this.projectURL}/${id}`;
	    return this.http.get<any>(url).pipe(
	        catchError(this.handleError<any>(`getPro id=${id}`))
	    );
	}

    updatePro(project: any): Observable<any> {
        const url = `${this.projectURL}/${project.id}`;
	    return this.http.put(url, { project: project }, this.httpOptions).pipe(
	        catchError(this.handleError<any>('updatePro'))
	    );
	}

	deletePro(id: number): Observable<any> {
		const url = `${this.projectURL}/${id}`;
	    return this.http.delete(url, this.httpOptions).pipe(
	        catchError(this.handleError<any>('deletePro'))
	    );
	}

	addPro(project: any): Observable<any> {
		return this.http.post(this.projectURL, { project: project }, this.httpOptions).pipe(
			catchError(this.handleError<any>('addPro'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	    console.error(error); // log to console instead

	    return of(result as T);
	  };
	}
}

﻿import {Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';

export class CachedReplaySubject<U extends { toString(): string }, T> {

  protected replaySubject = new Map<U, ReplaySubject<T>>();
  private allReplaySubjects = new ReplaySubject<T[]>();
  private elements: T[] = [];
  private gotAll = false;

  get(key: U, request: () => Observable<T>): Observable<T> {
    if (this.replaySubject.has(key)) {
      return this.replaySubject.get(key).asObservable();
    }
    const reloader$ = new ReplaySubject<T>();
    this.replaySubject.set(key, reloader$);
    request().pipe(tap(t => {
      this.elements.push(t);
    })).subscribe(t => reloader$.next(t));
    return reloader$.asObservable().pipe(filter(data => !!data));
  }

  addValue(key: U, t: T): Observable<T> {
    let replaySubject: ReplaySubject<T>;
    if (this.replaySubject.has(key)) {
      replaySubject = this.replaySubject.get(key);
    } else {
      replaySubject = new ReplaySubject<T>();
      this.replaySubject.set(key, replaySubject);
    }
    this.elements.push(t);
    replaySubject.next(t);
    this.allReplaySubjects.next(this.elements);
    return replaySubject;
  }

  getAll(request: () => Observable<T[]>): Observable<T[]> {
    if (!this.gotAll) {
      this.gotAll = true;
      return request().pipe(tap(values => this.allReplaySubjects.next(values)));
    }
    return this.allReplaySubjects.asObservable();
  }
}


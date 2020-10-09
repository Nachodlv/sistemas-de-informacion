﻿import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';

export class CachedReplaySubject<U extends { toString(): string, }, T extends { id: U }> {

  protected behaviourSubjects = new Map<U, BehaviorSubject<T>>();
  private allBehavioursSubjects = new BehaviorSubject<T[]>([]);
  private elements: T[] = [];
  private gotAll = false;

  get(key: U, request: () => Observable<T>): Observable<T> {
    if (this.behaviourSubjects.has(key)) {
      return this.behaviourSubjects.get(key).asObservable();
    }
    const reloader$ = new BehaviorSubject<T>(undefined);
    this.behaviourSubjects.set(key, reloader$);
    request().pipe(tap(t => {
      this.elements.push(t);
    })).subscribe(t => reloader$.next(t));
    return reloader$.asObservable().pipe(filter(data => !!data));
  }

  addValue(t: T): Observable<T> {
    let replaySubject: BehaviorSubject<T>;
    if (this.behaviourSubjects.has(t.id)) {
      replaySubject = this.behaviourSubjects.get(t.id);
      replaySubject.next(t);
    } else {
      replaySubject = new BehaviorSubject<T>(t);
      this.behaviourSubjects.set(t.id, replaySubject);
    }
    this.elements.push(t);
    this.allBehavioursSubjects.next(this.elements);
    return replaySubject;
  }

  deleteValue(t: T): void {
    this.elements = this.elements.filter(e => e.id !== t.id);
    this.behaviourSubjects.delete(t.id);
    this.allBehavioursSubjects.next(this.elements);
  }

  getAll(request: () => Observable<T[]>): Observable<T[]> {
    if (!this.gotAll) {
      this.gotAll = true;
      request().subscribe(values => {
        this.elements = values;
        this.allBehavioursSubjects.next(values);
      });
    }
    return this.allBehavioursSubjects.asObservable();
  }
}


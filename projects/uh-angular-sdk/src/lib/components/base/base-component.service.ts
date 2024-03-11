import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { IBaseComponentService } from '../../interfaces/base-component-service.interface';

@Injectable()
export class BaseComponentService implements IBaseComponentService {
  protected subscriptions = new Subscription();
  protected unnsubscribeSubject$: Subject<void> = new Subject<void>();

  //#region constructor

  constructor() { }

  //#endregion

  //#region lifecycle hooks

  public ngOnInit(): void {
    this.addSubscriptions();
  }

  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  //#endregion

  //#region protected

  protected addUnsubscribePipe<T>(observable$: Observable<T>): Observable<T>{
    return observable$.pipe(
      takeUntil(this.unnsubscribeSubject$)
    )
  }

  protected addSubscriptions(): void {
  }

  protected removeSubscriptions(): void{
    this.unnsubscribeSubject$.next();
    this.unnsubscribeSubject$.complete();
    this.subscriptions.unsubscribe();
  }

  //#endregion
}

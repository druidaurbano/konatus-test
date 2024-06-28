import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private selectedMenuItemSubject = new BehaviorSubject<string>('JSON');
  selectedMenuItem$ = this.selectedMenuItemSubject.asObservable();

  selectMenuItem(menuItem: string) {
    this.selectedMenuItemSubject.next(menuItem);
  }
}

import { Observable, BehaviorSubject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

export class AppStateStore {
  static INSTANCE = new AppStateStore({
    osisText: ""
  });

  constructor(initialState) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  setState(nextState) {
    this._state$.next(nextState);
  }

  static updateOsisText(osisText) {
    AppStateStore.INSTANCE.setState({ ...this.state, osisText });
  }
  static observeOsisText() {
    return AppStateStore.INSTANCE._state$.pipe(map(state => state.osisText));
  }
}

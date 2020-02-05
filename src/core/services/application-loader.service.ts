import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApplicationLoaderService {
  private loading = false;

  public startLoaderAnimation() {
    this.loading = true;
  }

  public stopLoaderAnimation() {
    this.loading = false;
  }

  public get isLoading(): boolean {
    return this.loading;
  }
}

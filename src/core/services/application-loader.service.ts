import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ApplicationLoaderService {
  private loading = false;

  public startLoaderAnimation() {console.log('Starting');
    this.loading = true;
  }

  public stopLoaderAnimation() {console.log('Stopping');
    this.loading = false;
  }

  public get isLoading(): boolean {
    return this.loading;
  }
}

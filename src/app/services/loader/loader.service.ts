import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader:HTMLIonLoadingElement;
  
  constructor(public loadingController: LoadingController) { }


  async presentLoader(options: any = {}) {
    this.loader = await this.loadingController.create(options);
    await this.loader.present();
  }

  async dismissLoader() {
      await this.loader.dismiss()
      .then(()=>{
        this.loader = null;
      })
      .catch(e => console.log(e));
  }
}

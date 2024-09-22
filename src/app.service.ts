import { Injectable } from '@nestjs/common';
import { caScraping } from './services/caScraping';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getCAinfos(id: string): Promise<caScrapingInfos> {
    return new Promise(async (resolve, reject) => {
      caScraping(id).then((caInfos) => {
      resolve(caInfos)
      }).catch((e) => {

        if(e == 'CA não encontrado') {
          console.log(e);
          
          reject('CA não encontrado')
        }
      })
    })
  }

}

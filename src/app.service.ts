import { Injectable } from '@nestjs/common';
import { caScraping } from './services/caScraping';
import { playwrightCaScraping } from './services/playwrightCaScraping';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  getCAinfos(id: string): Promise<caScrapingInfos> {
    return new Promise(async (resolve, reject) => {
      const caInfos = await caScraping(id)
      resolve(caInfos)
    })
  }

  teste(id: string): Promise<caScrapingInfos> {
    return new Promise(async (resolve, reject) => {
      const caInfos = await playwrightCaScraping(id)
      resolve(caInfos)
    })
  }
}

import { Injectable } from '@nestjs/common';
import { caScraping } from './services/caScraping';

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

}

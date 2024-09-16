import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getca/:id')
  async getHello(@Param('id') id: string): Promise<caScrapingInfos> {
    return new Promise(async (resolve, reject) => {
      console.log(id);

      this.appService.getCAinfos(id).then((infos) => {
        resolve(infos)
      })
    })
  }
}

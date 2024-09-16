import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getca/:id')
  @ApiProperty()
  @ApiResponse({ status: 200, description: 'retorna os dados do ca consultado.', schema: {
    example: [
      {
        "nome": "ÓCULOS",
        "validade": "13/04/2026",
        "nomeComercial": "ÓCULOS PROTEÇÃO UVA/UVB ANTIRRISCO ANTIEMBAÇANTE EGON CLEAR ",
        "descricao": "Óculos de segurança constituídos de armação e visor confeccionados em uma única peça de policarbonato disponível nas cores incolor e cinza. Na parte inferior do visor encaixa-se uma peça de plástico rígido da mesma cor do visor, em formato de \"V\", dotada de canaleta e dois orifícios utilizados para o encaixe do apoio nasal confeccionado em TPE nas cores incolor e cinza. Hastes tipo espátula fixadas ao visor através de pinos plásticos, confeccionadas do mesmo material da armação e poliamida cinza claro nas bordas.",
        "imagem": "https://consultaca.com/files/fotos_ca/38175-3533.jpg",
        "importador": {
          "razaoSocial": "DELTA PLUS BRASIL INDUSTRIA E COMERCIO DE EPI LTDA",
          "cnpj": "08.025.426/0001-01",
          "cidadeUf": "SAO PAULO/SP"
        },
        "normas": [
          "ANSI/ISEA Z87.1-2015"
        ],
        "laudo": {
          "numero": "1 122 955-203",
          "cnpj": "60.633.674/0001-55",
          "razaoSocial": "IPT/SP - INSTITUTO DE PESQUISAS TECNOLÓGICAS"
        }
      }
    ]
  } })
  async getHello(@Param('id') id: string): Promise<caScrapingInfos> {
    return new Promise(async (resolve, reject) => {
      console.log(id);

      this.appService.getCAinfos(id).then((infos) => {
        resolve(infos)
      })
    })
  }
}

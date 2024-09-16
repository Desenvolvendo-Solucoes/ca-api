import {By, Builder} from 'selenium-webdriver'
const chrome = require('selenium-webdriver/chrome');

export const caScraping = async (ca: string): Promise<caScrapingInfos> => {
  return new Promise(async (resolve, reject) => {
    let infos: caScrapingInfos 

    let options = new chrome.Options();
    options.addArguments('--headless'); // Ativar o modo headless
    options.addArguments('--disable-gpu'); // Necessário para rodar o headless no Windows
    options.addArguments('--no-sandbox'); // Segurança extra (especialmente em Linux)
    options.addArguments('--disable-dev-shm-usage'); // Otimização para contêineres
  
    let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    try {    
      await driver.get(`https://consultaca.com/${ca}`)
  
      const descricao = await driver.findElement(By.xpath("//div[h3[text()='Descrição Completa']]/p[@class='info']")).getText()
      const nome = await driver.findElement(By.xpath("/html/body/form/div[3]/div[4]/div[1]/div/div[1]/div/h1")).getText()
      const nomeComercial = await driver.findElement(By.xpath("//div[h3[text()='Nome Comercial (Modelo)']]/p[@class='info']")).getText()
      const validade = await driver.findElement(By.xpath("//div[@id='box_result']/p[strong[text()='Validade:']]/span[@class='validade_ca regular']")).getText()
      const epiImage = await driver.findElement(By.xpath("//div[h3[text()='Fotos do Equipamento']]/ul/li/a/img")).getAttribute("src")
      const razaoSocialImportador = await driver.findElement(By.xpath("//div[h3[text()='Fabricante']]/div/p[strong[text()='Razão Social Importador:']]")).getText()
      const cnpjImportador = await driver.findElement(By.xpath("//div[h3[text()='Fabricante']]/div/p[strong[text()='CNPJ Importador:']]")).getText()
      const cidadeUF = await driver.findElement(By.xpath("//div[h3[text()='Fabricante']]/div/p[strong[text()='Cidade/UF:']]")).getText()
      const normas = await driver.findElement(By.xpath("//div[h3[text()='Normas']]/ul")).getText()
      const numLaudo = await driver.findElement(By.xpath("//div[h3[text()='Laudos']]/p[strong[text()='N° do Laudo:']]")).getText()
      const cnpjLaboratorio = await driver.findElement(By.xpath("//div[h3[text()='Laudos']]/p[strong[text()='CNPJ do Laboratório:']]")).getText()
      const razaoSocialLaboratorio = await driver.findElement(By.xpath("//div[h3[text()='Laudos']]/p[strong[text()='Razão Social:']]")).getText()
  
      // console.log('Nome: ' + nome);
      // console.log('Validade: ' + validade);
      // console.log('Nome Comercial: ' + nomeComercial)
      // console.log('Descrição: ' + descricao)
      // console.log('Imagem EPI: ', epiImage)
      // console.log('Razão Social do Importador: ', razaoSocialImportador.toString().split("\n")[1])
      // console.log('CNPJ Importador: ' + cnpjImportador.toString().split("\n")[1])
      // console.log('Cidade/UF: ' + cidadeUF.toString().split("\n")[1])
      // console.log("Normas: " + normas);
      // console.log("Número do Laudo: " + numLaudo.toString().split("\n")[1]);
      // console.log("CNPJ do Laboratório: " + cnpjLaboratorio.toString().split("\n")[1]);
      // console.log("Razão Social do Laboratório: " + razaoSocialLaboratorio.toString().split("\n")[1]);

      infos = {
        nome,
        validade,
        nomeComercial,
        descricao,
        imagem: epiImage.toString(),
        importador: {
          razaoSocial: razaoSocialImportador,
          cnpj: cnpjImportador,
          cidadeUf: cidadeUF
        },
        normas: normas.split('\n'),
        laudo: {
          numero: numLaudo,
          cnpj: cnpjLaboratorio,
          razaoSocial: razaoSocialLaboratorio
        }
      }
    }
    finally {
      await driver.quit();
      resolve(infos);
    }
  })
}
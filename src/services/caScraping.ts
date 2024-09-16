const playwright = require('playwright');

export const playwrightCaScraping = async (ca: string): Promise<caScrapingInfos> => {
  return new Promise(async (resolve, reject) => {
    let infos: caScrapingInfos 
    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(`https://consultaca.com/${ca}`);
      const descricao = await page.locator("xpath=//div[h3[text()='Descrição Completa']]/p[@class='info']").textContent();
      const nome = await page.locator("xpath=/html/body/form/div[3]/div[4]/div[1]/div/div[1]/div/h1").textContent();
      const nomeComercial = await page.locator("xpath=//div[h3[text()='Nome Comercial (Modelo)']]/p[@class='info']").textContent();
      const validade = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='Validade:']]/span[@class='validade_ca regular']").textContent();
      const epiImages = await page.locator("xpath=//div[h3[text()='Fotos do Equipamento']]/ul/li/a/img").all();
      let epiImage
      for (const img of epiImages) {
        const src = await img.getAttribute("src");
        epiImage = src
      }
      const razaoSocialImportador = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Razão Social Importador:']]").textContent() 
      const cnpjImportador = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='CNPJ Importador:']]").textContent()
      const cidadeUF = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Cidade/UF:']]").textContent()
      const normas = await page.locator("xpath=//div[h3[text()='Normas']]/ul/li").allTextContents()
      const numLaudo = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='N° do Laudo:']]").textContent();
      const cnpjLaboratorio = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='CNPJ do Laboratório:']]").textContent();
      const razaoSocialLaboratorio = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='Razão Social:']]").textContent();

      infos = {
        nome,
        validade,
        nomeComercial,
        descricao,
        imagem: epiImage.toString(),
        importador: {
          razaoSocial: razaoSocialImportador.split(':')[1],
          cnpj: cnpjImportador.split(':')[1],
          cidadeUf: cidadeUF.split(':')[1]
        },
        normas: normas,
        laudo: {
          numero: numLaudo.split(':')[1],
          cnpj: cnpjLaboratorio.split(':')[1],
          razaoSocial: razaoSocialLaboratorio.split(':')[1]
        }
      }
    }
    finally {
      await browser.close();
      resolve(infos);
    }
  })
}
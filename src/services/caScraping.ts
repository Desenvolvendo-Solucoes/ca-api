const playwright = require('playwright');


export const caScraping = async (ca: string): Promise<caScrapingInfos> => {
  return new Promise(async (resolve, reject) => {
    let infos: caScrapingInfos 
    const browser = await playwright["chromium"].launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(`https://consultaca.com/${ca}`);
      
      let importador: Importador 
      let fabricante: Importador

      const descricao = await page.locator("xpath=//div[h3[text()='Descrição Completa']]/p[@class='info']").textContent();
      const nome = await page.locator("xpath=/html/body/form/div[3]/div[4]/div[1]/div/div[1]/div/h1").textContent();
      const validade = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='Validade:']]/span[@class='validade_ca regular']").textContent();
      const epiImages = await page.locator("xpath=//div[h3[text()='Fotos do Equipamento']]/ul/li/a/img").all();
      let epiImage
      if(epiImages.length > 0) {
        for (const img of epiImages) {
          const src = await img.getAttribute("src");
          epiImage = src
        }
      }else {
        const _epiImages = await page.locator("xpath=//div[h3[span[text()='Ofertas BuscaEPI relacionadas a este EPI']]]/div/div/div/div[a[span[@class='match']]]//div/img").all()
        for(const img of _epiImages) {
          const src = await img.getAttribute("src");
          epiImage = src
        }
      }

      const natureza = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='Natureza:']]").textContent()
      
      
      if( natureza === 'Natureza:Nacional'){
        var razaoSocialFabricante = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Razão Social:']]").textContent()
        var cnpjFabricante = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='CNPJ:']]").textContent()
        var cidadeUfFabricante = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Cidade/UF:']]").textContent()
        
        fabricante = {
          razaoSocial: razaoSocialFabricante.split(':')[1],
          cnpj: cnpjFabricante.split(':')[1],
          cidadeUf: cidadeUfFabricante.split(':')[1]
        }
      }else {       
        var razaoSocialImportador = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Razão Social Importador:']]").textContent() 
        var cnpjImportador = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='CNPJ Importador:']]").textContent()
        var cidadeUF = await page.locator("xpath=//div[h3[text()='Fabricante']]/div/p[strong[text()='Cidade/UF:']]").textContent()
        importador = {
          razaoSocial: razaoSocialImportador.split(':')[1],
          cnpj: cnpjImportador.split(':')[1],
          cidadeUf: cidadeUF.split(':')[1]
        }
    }

      const normas = await page.locator("xpath=//div[h3[text()='Normas']]/ul/li").allTextContents()
      const numLaudo = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='N° do Laudo:']]").textContent();
      const cnpjLaboratorio = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='CNPJ do Laboratório:']]").textContent();
      const razaoSocialLaboratorio = await page.locator("xpath=//div[h3[text()='Laudos']]/p[strong[text()='Razão Social:']]").textContent();

      infos = {
        ca,
        nome,
        validade,
        descricao,
        imagem: epiImage.toString(),
        importador,
        fabricante,
        normas: normas,
        laudo: {
          numero: numLaudo.split(':')[1],
          cnpj: cnpjLaboratorio.split(':')[1],
          razaoSocial: razaoSocialLaboratorio.split(':')[1]
        },
        natureza: natureza.split(':')[1]
      }
    }
    finally {
      await browser.close();    
      console.log('finalizou a busca');
      resolve(infos);
    }
  })
}
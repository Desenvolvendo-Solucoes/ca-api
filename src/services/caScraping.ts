const playwright = require('playwright');


export const caScraping = async (ca: string): Promise<caScrapingInfos> => {
  return new Promise(async (resolve, reject) => {
    let infos: caScrapingInfos 
    const browser = await playwright["chromium"].launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await page.goto(`https://consultaca.com/${ca}`);
      
      if(page.url() == "https://consultaca.com/") {
        reject('CA não encontrado');
      }else {
        let importador: Importador 
        let fabricante: Importador

        const nome = await page.locator("xpath=/html/body/form/div[3]/div[4]/div[1]/div/div[1]/div/h1").textContent();
        const status = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='Situação:']]").textContent()
        const validade = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='Validade:']]/span[@class='validade_ca regular']").textContent();
        const numProcesso = await page.locator("xpath=//div[@id='box_result']/p[strong[text()='N° Processo:']]").textContent();
        const descricao = await page.locator("xpath=//div[h3[text()='Descrição Completa']]/p[@class='info']").textContent();
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

        const laudos = await page.locator("xpath=//div[h3[text()='Laudos']]/p").all()
        let _laudos: Laudo[] = [];
        let l: Laudo = {
          numero: '',
          cnpj: '',
          razaoSocial: ''
        }

        let counter = 0
        for (const x of laudos) {
          switch (counter) {
            case 0:
              const numeroLaudo = await x.textContent()
              l.numero = numeroLaudo.toString().split(':')[1]
              counter++
              break;
            case 1: 
              const cnpjLab = await x.textContent()
              l.cnpj = cnpjLab.toString().split(':')[1]
              counter++
              break;
             case 2:
              const razSocial = await x.textContent()
              l.razaoSocial = razSocial.toString().split(':')[1]
              _laudos.push(l)
              counter = 0              
              break;
          }
        }
        
        const normas = await page.locator("xpath=//div[h3[text()='Normas']]/ul/li").allTextContents()
        

        infos = {
          ca,
          status: status.split(":")[1],
          nome,
          validade,
          natureza: natureza.split(':')[1],
          numeroProcesso: numProcesso.split(':')[1],
          descricao,
          imagem: epiImage.toString(),
          importador,
          fabricante,
          normas: normas,
          laudos: _laudos
        }
      }

    }
    finally {
      await browser.close();    
      console.log('finalizou a busca');
      resolve(infos);
    }
  })
}
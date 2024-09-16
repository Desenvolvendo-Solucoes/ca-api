type caScrapingInfos = {
  nome: string;
  validade: string;
  nomeComercial: string;
  descricao: string;
  imagem: string;
  importador: Importador;
  normas: string[];
  laudo: Laudo;
}

type Laudo = {
  numero: string;
  cnpj: string;
  razaoSocial: string;
}

type Importador = {
  razaoSocial: string;
  cnpj: string;
  cidadeUf: string;
}
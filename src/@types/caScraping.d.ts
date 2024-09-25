type caScrapingInfos = {
  ca: string, 
  nome: string;
  validade: string;
  descricao: string;
  imagem: string;
  importador: Importador;
  fabricante: Importador;
  normas: string[];
  laudos: Laudo[];
  natureza: string;
  numeroProcesso: string;
  status: string;
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
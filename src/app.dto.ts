import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImportadorDto {
  @IsString()
  razaoSocial: string;

  @IsString()
  cnpj: string;

  @IsString()
  cidadeUf: string;
}

class LaudoDto {
  @IsString()
  numero: string;

  @IsString()
  cnpj: string;

  @IsString()
  razaoSocial: string;
}

export class CaDto {
  @IsString()
  nome: string;

  @IsString()
  validade: string;

  @IsString()
  nomeComercial: string;

  @IsString()
  descricao: string;

  @IsString()
  imagem: string;

  @ValidateNested()
  @Type(() => ImportadorDto)
  importador: ImportadorDto;

  @IsArray()
  @IsString({ each: true })
  normas: string[];

  @ValidateNested()
  @Type(() => LaudoDto)
  laudo: LaudoDto;
}

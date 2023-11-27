import { IsNotEmpty } from 'class-validator';

export class CreateFleetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  area: string;
}

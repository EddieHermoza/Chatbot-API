import { IsString } from 'class-validator';
export class RequestChatDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;
}

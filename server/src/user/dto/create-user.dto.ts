export class CreateUserDto {
  readonly login: string;
  readonly password: string;
  readonly post: string;
  readonly banned: boolean;
}
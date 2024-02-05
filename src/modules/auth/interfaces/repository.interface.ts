import { CredentialsDtoWithChannel } from '../dto/user-credentials.dto';
import { IUserToken } from './auth.interface';

export interface IAuthRepository {
  signIn(credentials: CredentialsDtoWithChannel): Promise<IUserToken>;
}

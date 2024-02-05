import { CredentialsDtoWithChannel } from '../dto/user-credentials.dto';
import { IJwtToken } from './auth.interface';

export interface IAuthRepository {
  signIn(credentials: CredentialsDtoWithChannel): Promise<IJwtToken>;
}

import { createHmac } from 'node:crypto';

interface IGenerateSignature {
  secret: string;
  header: string;
  payload: string;
}

export const generateSignature = ({
  secret,
  header,
  payload
}: IGenerateSignature) => {
  const hmac = createHmac('sha256',secret);

  return  hmac.update(`${header}.${payload}`).digest('base64url');  //To pass information to hmac tool we use update method and after that we use digest to generate  base64url

}


import { generateSignature } from './generateSignature';

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export const sign = ({data, exp, secret}: ISignOptions) => {

  const header = {
    alg: 'HS256',//Algorithm type
    typ: 'JWT',//Type
  };

  const payload = {
    ...data,
    iat: Date.now(),//Date in ms
    exp,
  };

  const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url'); //How to format code in base64url type

  const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');


  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
    secret,
  })

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;//Token return

}

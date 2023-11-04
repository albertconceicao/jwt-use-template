import { generateSignature } from './generateSignature';

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export const sign = ({data, exp, secret}: ISignOptions) => {

  const header = {
    alg: 'HS256',//Tipo de algoritmo
    typ: 'JWT',//Tipo
  };

  const payload = {
    ...data,
    iat: Date.now(),//Data em ms
    exp,
  };

  const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url'); // Como formatar o código em base64URL

  const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');


  const signature = generateSignature({
    header: base64EncodedHeader,
    payload: base64EncodedPayload,
    secret,
  })
  //Para passar info para hmac usamos update e depois ele digere a info em base64url

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;//Retorno do token

}

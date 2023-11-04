import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export const verify = ({token, secret}: IVerifyOptions) => {
  const [headerSent, payloadSent, signatureSent] = token.split('.');

  const signature = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret
  })

  if(signature !== signatureSent) {
    throw new Error('Invalid JWT Token');
  }

  const decodedPayload = JSON.parse(
    Buffer
      .from(payloadSent, 'base64url')
      .toString('utf-8')); //To verify expiration date we have to decode to base64url from utf-8


  if(decodedPayload.exp < Date.now()) {
    throw new Error('Token expired')
  }
  return decodedPayload;

}

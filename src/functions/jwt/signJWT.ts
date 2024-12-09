import jwt from 'jsonwebtoken';
import fs from 'fs';
import keyNames from '@/data/keyNames';
import privateKeyContents from '../certs/privateKeyContents';

/** This function signs a payload JWT using the private key */
export default async function signJWT(payload: any) {
	const privateKeyRes = await privateKeyContents(),
		privateKey = privateKeyRes?.key || '';
	const token = jwt.sign(payload, privateKey, { algorithm: 'ES512', expiresIn: '5m' });
	return token;
}

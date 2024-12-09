import bcrypt from 'bcrypt';

// Define the number of salt rounds
const SALT_ROUNDS = 10;

export default async function hashPassword(password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
			if (err) reject(err);
			else resolve(hash);
		});
	});
}

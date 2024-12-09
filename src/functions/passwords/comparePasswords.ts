import bcrypt from 'bcrypt';

export async function comparePassword(password: string, hash: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
}

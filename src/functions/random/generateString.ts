function generateString(strLength = 32) {
	let stringLength = strLength,
		finalString = '';

	for (let i = 0; i < stringLength; i++) {
		let num = Math.floor(Math.random() * (26 * 2 + 10));
		let demoString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		finalString += demoString[num];
	}

	return finalString;
}

export default generateString;

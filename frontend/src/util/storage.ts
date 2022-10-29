export function makeQuestionKey(questionId: number) {
	return `question-${questionId}`;
}

export function persistItem(key: string, value: string) {
	window.sessionStorage.setItem(key, value);
}

export function getPersistentItem(key: string) {
	return window.sessionStorage.getItem(key);
}

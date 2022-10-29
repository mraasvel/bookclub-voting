/*
Explanation:
Each form entry will have a single type and an associated non-null row to another table with data related to that type.
This makes it easy to add and store new types and have any amount of necessary information for that type.
*/

enum FormQuestionType {
	LinearScale = 'LinearScale',
}

export default FormQuestionType;

export function FormQuestionTypeString() {
	return `[${Object.keys(FormQuestionType)
		.map((s) => `'${s}'`)
		.join(', ')}]`;
}

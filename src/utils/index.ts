export const compareJson = (obj1: string, obj2: string) => {
	const json1 = JSON.parse(obj1);
	const json2 = JSON.parse(obj2);

	return compare(json1, json2);
};

const compare = (json1: object, json2: object, key?: string) => {
	let diffKey: number = 0;
	let diffTypes: number = 0;
	let diffValues: number = 0;
	let messages: string[] = [];
	const keyDiff = getKeyDifference(json1, json2, key);
	diffKey = keyDiff.keyDifference;
	messages = [...messages, ...keyDiff.messages];
	for (const key of keyDiff.sameKeys) {
		const val1: unknown = (json1 as { [key: string]: unknown })[key];
		const val2: unknown = (json2 as { [key: string]: unknown })[key];
		const diffValueResult = getIfDiffValueType(val1, val2, key);
		diffTypes += diffValueResult.count;
		if (diffValueResult.message) messages.push(diffValueResult.message);
		if (typeof val1 === "object" && val1 !== null && typeof val2 === "object" && val2 !== null) {
			const valueDiff = getValuesDiff(val1, val2, key);
			diffKey += valueDiff.diffKey;
			diffTypes += valueDiff.diffTypes;
			diffValues += valueDiff.diffValues;

			messages = [...messages, ...valueDiff.messages];
		}
	}
	return {
		messages,
		diffKey,
		diffTypes,
		diffValues,
	};
};

const getValuesDiff = (value1: object, value2: object, key: string) => {
	const diffKey: number = 0;
	let diffTypes: number = 0;
	let diffValues: number = 0;
	const messages: string[] = [];

	if (Array.isArray(value1) && Array.isArray(value2)) {
		const missingElements1: unknown[] = value1.filter(el => !value2.includes(el));
		const missingElements2: unknown[] = value2.filter(el => !value1.includes(el));

		outerLoop: for (const el of missingElements1) {
			for (const el2 of missingElements2) {
				if (typeof el !== typeof el2) {
					messages.push(`Values of ${key} have different types: ${typeof el} and ${typeof el2}`);
					diffTypes += 1;
					break outerLoop;
				}
			}
		}

		if (diffTypes === 0) {
			if (missingElements1.length > 0) {
				messages.push(`Values of ${key} on the right side are missing elements: ${missingElements1.join(", ")}`);
				diffValues += 1;
			}

			if (missingElements2.length > 0) {
				messages.push(`Values of ${key} on the left side are missing elements: ${missingElements2.join(", ")}`);
				diffValues += 1;
			}
		}
	}
	if (!Array.isArray(value1) && !Array.isArray(value2)) {
		return compare(value1, value2, key);
	}

	return {
		messages,
		diffKey,
		diffTypes,
		diffValues,
	};
};

const getIfDiffValueType = (value1: unknown, value2: unknown, key: string) => {
	if (typeof value1 !== typeof value2) {
		return { count: 1, message: `Values of key: ${key}, both should  be type ${typeof value1} or ${typeof value2}` };
	}
	if ((Array.isArray(value1) && !Array.isArray(value2)) || (!Array.isArray(value1) && Array.isArray(value2))) {
		return { count: 1, message: `Values of key: ${key}, should both be array or object` };
	}
	return { count: 0 };
};

const getKeyDifference = (json1: object, json2: object, mainKey: string | undefined) => {
	const keys1 = Object.keys(json1);
	const keys2 = Object.keys(json2);
	const messages: string[] = [];

	keys1.forEach(key => {
		if (!keys2.includes(key)) {
			messages.push(`Property ${key} missing from the ${mainKey ? mainKey : "object"} on the right side`);
		}
	});
	keys2.forEach(key => {
		if (!keys1.includes(key)) {
			messages.push(`Property ${key} missing from the ${mainKey ? mainKey : "object"} on the left side`);
		}
	});
	const uniqValues1 = keys1.filter(key => !keys2.includes(key));
	const uniqValues2 = keys2.filter(key => !keys1.includes(key));
	const sameKeys = keys1.filter(key => keys2.includes(key));
	return {
		messages,
		sameKeys,
		keyDifference: uniqValues1.length + uniqValues2.length,
	};
};

export const leftSample = `{"Aidan Gillen": {"array": ["Game of Thron'/es","The Wire"],"string": "some string","int": 2,
"aboolean": true, "boolean": true,"object": {"foo": "bar","object1": {"new prop1": "new prop value"},
"object2": {"new prop1": "new prop value"},"object3": {"new prop1": "new prop value"},"object4": {"new prop1": "new prop value"}}},
"Amy Ryan": {"one": "In Treatment","two": "The Wire"},"Annie Fitzgerald": ["Big Love","True Blood"],"Anwan Glover": ["Treme","The Wire"],
"Alexander Skarsgard": ["Generation Kill","True Blood"], "Clarke Peters": null, "Fitzz": [22, "Big Love", 11]}`;

export const rightSample = `{"Aidan Gillen": {"array": ["Game of Thrones","The Wire"],"string": "some string","int": "2","otherint": 4, "aboolean": "true", "boolean": false,
"object": {"foo": "bar"}},"Amy Ryan": ["In Treatment","The Wire"],"Annie Fitzgerald": ["True Blood","Big Love","The Sopranos","Oz"],
"Anwan Glover": ["Treme","The Wire"], "Alexander Skarsgrd": ["Generation Kill","True Blood"],"Alice Farmer": ["The Corner", "Oz","The Wire"], "Fitzz": ["Big Love", "11"] }`;

export const formatJson = (input1: string | null, input2: string | null) => {
	if (!input1 || !input2) {
		alert(`Please enter JSON data to ${!input1 && !input2 ? "both fields" : !input1 ? "left field" : "right field"}.`);
		return null;
	}
	try {
		const parsedJson1 = JSON.parse(input1);
		const parsedJson2 = JSON.parse(input2);
		if (typeof parsedJson1 !== "object" || parsedJson1 === null) {
			alert("Invalid JSON format at left field. Please enter a valid JSON object.");
			return null;
		}
		if (typeof parsedJson2 !== "object" || parsedJson2 === null) {
			alert("Invalid JSON format at right field. Please enter a valid JSON object.");
			return null;
		}

		return { left: JSON.stringify(parsedJson1, null, 2), right: JSON.stringify(parsedJson2, null, 2) };
	} catch (error) {
		alert(`Invalid JSON format. ${(error as Error).message}`);
		return null;
	}
};

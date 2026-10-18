export const getLabels = (value: unknown) => {
	const values =
		typeof value === "string"
			? value.split(";")
			: Array.isArray(value)
				? value.filter((item): item is string => typeof item === "string")
				: [];

	return values.map((item) => item.trim()).filter(Boolean);
};

import type { CharacterBirthday } from "@/api/routes/list-characters";

export const formatBirthday = (
	birthday: CharacterBirthday | null,
) => {
	if (!birthday) return null;

	if (birthday.label?.pt) return birthday.label.pt;

	if (birthday.day != null && birthday.month != null) {
		return `${birthday.day}/${birthday.month}`;
	}

	return null;
};

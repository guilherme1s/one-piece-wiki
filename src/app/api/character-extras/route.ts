import { NextRequest, NextResponse } from "next/server";
import { findCharacterExtras } from "@/lib/character-extras";

export const GET = async (request: NextRequest) => {
	const name = request.nextUrl.searchParams.get("name")?.trim();

	if (!name) {
		return NextResponse.json(
			{ extras: null },
			{ status: 400 },
		);
	}

	try {
		const extras = await findCharacterExtras(name);

		return NextResponse.json(
			{ extras },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=86400, stale-while-revalidate=604800",
				},
			},
		);
	} catch {
		return NextResponse.json({ extras: null });
	}
};

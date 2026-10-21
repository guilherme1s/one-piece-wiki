export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "http://localhost:3000");

export const SITE_NAME = "One Piece Wiki";

export const SITE_DESCRIPTION =
	"A enciclopédia do universo de One Piece. Explore personagens, akumas no mi, tripulações e recompensas do mundo da obra.";

export interface ITurnCircleItem {
	title: string;
	image: string;
	[index: string]: unknown;
}

export type TOnItemClick = (index: number) => void;

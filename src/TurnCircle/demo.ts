import { TurnCircle, ITurnCircleItem, TurnCircleItem } from '.';

const items: ITurnCircleItem[] = [
	{
		title: '一等奖',
		image: '/option/options_1.png',
	},
	{
		title: '一等奖',
		image: '/option/options_1.png',
	},
];

const turnCircle = new TurnCircle();
turnCircle.mount('#app');

turnCircle.addChild(
	new TurnCircleItem({
		text: '一等奖',
		image: '/option/option_1.png',
	}),
);

import { TurnCircle, ITurnCircleItem } from '.';

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

const turnCircle = new TurnCircle(items);

turnCircle.mount('#app');

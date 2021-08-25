import {
	Application,
	Container,
	ITextStyle,
	Loader,
	Sprite,
	Text,
	TextStyle,
} from 'pixi.js';
import { createApp } from '../shared';

export * from './type';

let rate = 1;
const loader = new Loader();

export type TTurnCircleItemProps = {
	text?: string;
	textStyle?: Partial<ITextStyle>;
	image?: string;
};

export class TurnCircleItem {
	public props: TTurnCircleItemProps;
	public readonly group = new Container();

	public constructor(props: TTurnCircleItemProps) {
		this.props = props;
		this.render();
	}

	public render() {
		const { text, textStyle, image } = this.props;
		const style = new TextStyle({
			fontSize: 18 * rate,
			fill: ['#ffffff', '#00ff99'], // gradient
			stroke: '#4a1850',
			strokeThickness: 5,
			wordWrap: true,
			wordWrapWidth: 440,
			lineJoin: 'round',
			...textStyle,
		});

		if (text) {
			const richText = new Text(text, style);
			this.group.addChild(richText);
		}

		if (image) {
			loader.add(image, image).load(() => {
				const img = new Sprite(loader.resources[image].texture);
				this.group.addChild(img);
			});
		}
	}
}

export class TurnCircle {
	private app: Application | undefined;

	public mount(container: HTMLElement | string) {
		let parent: HTMLElement | null;

		if (typeof container === 'string') {
			parent = document.querySelector(container);
		} else {
			parent = container;
		}

		if (parent === null) {
			throw Error('container is not existed');
		}

		this.app = createApp({
			width: parent.clientWidth,
			height: parent.clientHeight,
		});

		parent.appendChild(this.app.view);

		console.log(this.app.screen, this.app.view.width);
	}

	public addChild(item: TurnCircleItem) {
		const { app } = this;

		if (app) {
			app.stage.addChild(item.group);
		}
	}
}

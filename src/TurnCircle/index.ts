import { Application, Graphics, Rectangle, Text, TextStyle } from 'pixi.js';
import { createApp } from '../shared';
import { ITurnCircleItem } from './type';

export * from './type';

let rate = 1;

export class TurnCircle {
	private app: Application;
	private items: ITurnCircleItem[];

	public constructor(items: ITurnCircleItem[]) {
		this.app = createApp();
		this.items = items;
	}

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

		parent.appendChild(this.app.view);

		rate = parent.clientWidth / 300;

		console.log(rate);

		// this.app.resize();

		console.log(this.app.view.width);

		this.renderBackground();
		this.drawItems();
	}

	private renderBackground() {
		const { app } = this;

		const bg = new Graphics();
		bg.width = app.view.width;
		bg.height = app.view.height;
		bg.beginFill(0x1099bb);
		bg.drawRect(0, 0, app.view.width, app.view.height);

		this.app.stage.addChild(bg);
	}

	private drawItems() {
		const { app, items } = this;

		const style = new TextStyle({
			// fontFamily: 'Arial',
			fontSize: 18 * rate,
			// fontStyle: 'italic',
			// fontWeight: 'bold',
			fill: ['#ffffff', '#00ff99'], // gradient
			stroke: '#4a1850',
			strokeThickness: 5,
			// dropShadow: true,
			// dropShadowColor: '#000000',
			// dropShadowBlur: 4,
			// dropShadowAngle: Math.PI / 6,
			// dropShadowDistance: 6,
			wordWrap: true,
			wordWrapWidth: 440,
			lineJoin: 'round',
		});

		for (let i = 0; i < items.length; i++) {
			const richText = new Text(items[i].title, style);
			richText.x = 100;
			richText.y = i * 100;
			app.stage.addChild(richText);
		}
	}
}

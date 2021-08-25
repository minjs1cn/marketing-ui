import { Application, IApplicationOptions } from 'pixi.js';

export function createApp(options?: IApplicationOptions) {
	const app = new Application({
		width: 300,
		height: 300,
		resolution: window.devicePixelRatio || 1,
		// backgroundAlpha: 0,
		...options,
	});

	app.view.style.width = '100%';
	app.view.style.height = '100%';

	return app;
}

import { App, Editor, MarkdownFileInfo, MarkdownView } from "obsidian";

import constant from "./constants";
import logger from "./utils/logger";

import type MainPlugin from "./main";
export default class Instance {
	plugin: MainPlugin;
	app: App;
	loaded: boolean;

	constructor(plugin: MainPlugin) {
		constant.loaded = true;
		this.loaded = true;
		this.plugin = plugin;
		this.app = plugin.app;
	}

	async onload() {
		this.loaded = true;

		if (this.plugin.settings.debug) {
			logger.debugNotice("Debug mode enabled");
		}

		await this.registerEvents();
	}

	async registerEvents() {
		this.plugin.registerEvent(
			this.app.vault.on("create", () => {
				logger.debugNotice("a new file has entered the arena");
			})
		);

		this.plugin.registerEvent(
			this.app.workspace.on("editor-change", async (editor, info) => {
				await this.onChange(editor, info);
			})
		);

		this.plugin.registerEvent(
			this.app.workspace.on("layout-change", async () => {
				await this.onLayoutChange();
			})
		);
	}

	onunload() {
		this.loaded = false;
		constant.loaded = false;
	}

	async onChange(editor: Editor, info: MarkdownView | MarkdownFileInfo) {
		logger.debugNotice("editor change");
	}

	async onLayoutChange() {
		logger.debugNotice(`${this.plugin.manifest.dir}`);
	}

	async onSwitchToReading() {
		logger.debugNotice("switch to reading mode");
	}

	async onSwitchToLive() {
		logger.debugNotice("switch to live");
	}
}

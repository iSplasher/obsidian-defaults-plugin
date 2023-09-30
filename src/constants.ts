import { App } from "obsidian";

import Emitter from "./events";

import type { PluginSettings } from "./components/settings";

const cssPrefix = (cls: string) => `plugin-name-${cls}`;

export const CLASSES = {
	modal: cssPrefix("modal"),
	error: cssPrefix("error"),
	errorDetails: cssPrefix("error-details"),

	// settings classes
	settings: cssPrefix("settings"),
	settingsWideControl: cssPrefix("wide-control"),
	settingsExpandedControl: cssPrefix("expanded-control"),

	// misc classes
	indent: cssPrefix("plugin-indent"),
};

export class constant {
	static loaded = false;
	static app?: App;
	static events?: Emitter;
	static settings?: PluginSettings;
	static isDev =
		typeof process !== "undefined" &&
		process.env.NODE_ENV === "development";
}

export default constant;

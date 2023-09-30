import EventEmitter from "eventemitter3";

import type { PluginSettings } from "./components/settings";

export interface EventMap {
	settingsChanged: (
		newSettings: PluginSettings,
		oldSettings: PluginSettings
	) => any;
}

export default class Emitter extends EventEmitter<EventMap> {}

import { App, PluginSettingTab, Setting } from "obsidian";

import constant from "@/constants";

import type MainPlugin from "@/main";
export const DEFAULT_SETTINGS = {
	showError: "modal" as "modal" | "notice" | "none",
	showNotice: {},
	debug: constant.isDev,
};

export type PluginSettings = typeof DEFAULT_SETTINGS;

export default class SettingsTab extends PluginSettingTab {
	plugin: MainPlugin;

	constructor(app: App, plugin: MainPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h1", { text: "Plugin Name" });

		const createHeader = (text: string) =>
			containerEl.createEl("h2", { text });
		const descEl = containerEl.createDiv();

		descEl.append(
			"MarkPlace is a templating plugin that allows you to render ",
			descEl.createEl("em", { text: "in place" }),
			", directly inside your notes.",
			descEl.createEl("br"),
			descEl.createEl("br"),
			descEl.createEl("b", { text: "Usage:" }),
			descEl.createEl("br")
		);

		createHeader("Advanced");

		new Setting(containerEl)
			.setName("Report error")
			.setDesc("Specify how to report errors")
			.addDropdown((dropdown) => {
				dropdown
					.addOption("modal", "Modal")
					.addOption("notice", "Notice")
					.addOption("none", "None")
					.setValue(this.plugin.settings.showError)
					.onChange(async (value: PluginSettings["showError"]) => {
						const v = (
							["modal", "notice", "none"] as const
						).includes(value)
							? value
							: "none";

						this.plugin.settings.showError = v;
						await this.plugin.saveSettings({
							showError: v,
						});
					});
			});

		new Setting(containerEl)
			.setName("Debug")
			.setDesc("Enables debug logging and extra error information.")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.debug)
					.onChange(async (value: PluginSettings["debug"]) => {
						await this.plugin.saveSettings({
							debug: value,
						});
					});
			});
	}
}

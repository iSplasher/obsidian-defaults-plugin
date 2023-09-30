import { Notice } from "obsidian";

import logger from "@/utils/logger";

import type { PluginError } from "@/utils/error";
export function formatNoticeMessage(brief: string, details: string) {
	return `${brief}\n  ------\n  ${details.replace(
		/\n ?/g,
		"\n  "
	)}\n  ------`;
}

export default class PluginNotice extends Notice {
	constructor(message: string, timeout = 8000) {
		const brief = "Plugin Name";
		const details = message;
		super(formatNoticeMessage(brief, details), timeout);
	}
}

export class PluginErrorNotice extends Notice {
	constructor(error: PluginError, timeout = 8000) {
		logger.error(error);
		const message = formatNoticeMessage(error.brief, error.details);
		super(`${error.name}\n> ${message}`, timeout);
	}
}

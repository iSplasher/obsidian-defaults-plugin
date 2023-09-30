import { CustomError } from "ts-custom-error";

import ErrorModal from "@/components/modals/error";
import { formatNoticeMessage, PluginErrorNotice } from "@/components/notice";
import { constant } from "@/constants";

import logger from "./logger";

export class PluginConsoleError extends CustomError {
	constructor(...messages: string[]) {
		super(messages.join(" "));
	}
}

export class AppNotDefinedError extends PluginConsoleError {
	constructor() {
		super("App is not defined");
	}
}

export class PluginError extends PluginConsoleError {
	brief: string;
	details: string;
	consoleMsg: string;

	constructor(brief: string, ...messages: string[]) {
		const details = messages.join(" ");
		const consoleMsg = formatNoticeMessage(brief, details);
		super(consoleMsg);
		this.brief = brief;
		this.details = details;
		this.consoleMsg = consoleMsg;
	}

	static notice(brief: string, ...messages: string[]) {
		const err = new this(brief, ...messages);
		return err._notice();
	}

	_notice() {
		if (constant.settings?.showError === "modal") {
			new ErrorModal(this).open();
		} else if (constant.settings?.showError === "notice") {
			new PluginErrorNotice(this);
		} else {
			logger.error(this);
		}

		return this;
	}
}

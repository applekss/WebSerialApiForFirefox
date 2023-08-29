import { sendToBackground } from "./messaging/background"
import { sendToNative } from "./messaging/native"
import { sendToPopup } from "./messaging/popup"
import {
	extendPromiseFromBackground,
	rejectPromiseFromBackground,
	resolvePromiseFromBackground,
} from "./messaging/promises"
import { SerialPortData } from "./serial/types"

export async function getPorts(origin: string): Promise<SerialPortData[]> {
	return await sendToBackground({ action: "getPorts", origin })
}

export async function requestPort(
	origin: string,
	options?: SerialPortRequestOptions
): Promise<SerialPortData> {
	return await sendToBackground({ action: "requestPort", origin, options })
}

export async function listAvailablePorts(
	origin?: string,
	options?: SerialPortRequestOptions
): Promise<SerialPortData[]> {
	return await sendToBackground({
		action: "listAvailablePorts",
		origin,
		options,
	})
}

export async function choosePort(
	origin: string,
	options?: SerialPortRequestOptions
): Promise<SerialPortData> {
	return await sendToPopup({ action: "choosePort", origin, options })
}

export async function extendPromise(
	id: string,
	timeoutMs: number
): Promise<void> {
	if (window === (await browser.runtime.getBackgroundPage()))
		return extendPromiseFromBackground(id, timeoutMs)
	await sendToBackground({ action: "extendPromise", id, timeoutMs })
}

export async function resolvePromise(id: string, value: any): Promise<void> {
	if (window === (await browser.runtime.getBackgroundPage()))
		return resolvePromiseFromBackground(id, value)
	await sendToBackground({ action: "resolvePromise", id, value })
}

export async function rejectPromise(id: string, reason?: any): Promise<void> {
	if (window === (await browser.runtime.getBackgroundPage()))
		return rejectPromiseFromBackground(id, reason)
	await sendToBackground({ action: "rejectPromise", id, reason })
}

export async function listPortsNative(): Promise<SerialPortData[]> {
	return await sendToNative({ action: "listPorts" })
}

export async function authGrant(port: string): Promise<string> {
	return await sendToNative({ action: "authGrant", port })
}

export async function authRevoke(port: string): Promise<void> {
	await sendToNative({ action: "authRevoke", port })
}

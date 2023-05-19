import 'reflect-metadata';
import { DiscordClient } from "./client/notification/discord/DiscordClient";
import { StormAlertNotifier } from "./client/notification/StormAlertNotifier";

/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */
export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	STW_ASSISTANT_NAMESPACE: KVNamespace
}

export default {

	async fetch(env: Env, ctx: ExecutionContext): Promise<void> {
		// The fetch handler is empty, but anyway, we need
		// to have it as wrangler causes a lot of noise
		// while it is missing.
	},

	async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
		const client = new DiscordClient()

		const stormAlertNotificationTarget = await env.STW_ASSISTANT_NAMESPACE.get("STORM_ALERT_NOTIFICATION_WEBHOOK_URL")
		const stormAlertNotifier = new StormAlertNotifier(client, stormAlertNotificationTarget)
		await stormAlertNotifier.notify()
	}
}
import { Webhook } from "./webhook/Webhook";

export class DiscordClient {

    async sendWebhook(target: string | null, payload: Webhook) {
        if (target == null) {
            return
        }

        const settings = {
            body: JSON.stringify(payload),
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        }

        await fetch(target, settings)
    }
}
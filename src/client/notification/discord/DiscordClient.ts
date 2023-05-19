import { Webhook } from "./webhook/Webhook";

export class DiscordClient {

    async sendWebhook(target: string, payload: Webhook) {
        const settings = {
            body: JSON.stringify(payload),
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        }

        const response = await fetch(target, settings)
        const results = await this.gatherResponse(response)
        return new Response(results, settings)
    }

    // Source: https://developers.cloudflare.com/workers/examples/post-json/
    private async gatherResponse(response: any) {
        const { headers } = response;
        const contentType = headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return JSON.stringify(await response.json());
        } else if (contentType.includes("application/text")) {
            return response.text();
        } else if (contentType.includes("text/html")) {
            return response.text();
        } else {
            return response.text();
        }
    }
}
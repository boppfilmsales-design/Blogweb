# blogweb-email-sender

Internal Cloudflare Worker that sends the website's inquiry notification email.
The Pages project (`blogweb`) calls it through a **Service Binding** named
`EMAIL_SENDER`, because a Pages Function cannot hold a `send_email` binding.

```
browser → POST /api/inquiry (Pages Function)
        → Service binding EMAIL_SENDER → this Worker → env.EMAIL.send()
        → sale@apigcl.com  ⇒  message@boppfilmsale.com
```

## One-time setup

1. **Onboard the sending domain** — Cloudflare dashboard → Compute → Email
   Service → Email Sending → *Onboard Domain* → `apigcl.com` (or
   `boppfilmsale.com`). Email Service requires the zone to use Cloudflare DNS.
2. **Verify the recipient** — `message@boppfilmsale.com` must be a verified
   destination address on the account, otherwise the binding refuses to send.
3. **Deploy this Worker** (from this directory):

   ```bash
   npx wrangler deploy
   ```

   `wrangler.toml` sets `workers_dev = false`, so the Worker has no public URL —
   only a binding can reach it.
4. **Bind it to the Pages project** — dashboard → Workers & Pages → `blogweb` →
   Settings → Bindings → *Add* → **Worker** (service binding):
   - Variable name: `EMAIL_SENDER`
   - Worker: `blogweb-email-sender`

   Add it for **Production** and **Preview**, then redeploy `blogweb`.

## API

`POST /send`

```json
{
  "to": "message@boppfilmsale.com",
  "from": "AEC Group Inquiry <sale@apigcl.com>",
  "replyTo": "customer@example.com",
  "subject": "New Film Inquiry: BOPP Gloss — Jane Doe (Acme)",
  "html": "<p>…</p>",
  "text": "…"
}
```

Responses: `200 { success: true, messageId }`, `400` on validation failure,
`502` when Email Service rejects the message (the body carries the Email
Service error `code`, e.g. `E_SENDER_NOT_VERIFIED`).

Only senders on `apigcl.com` / `boppfilmsale.com` are accepted
(`ALLOWED_FROM_DOMAINS` in `src/index.ts`).

## Notes

- Email Service limits (recipients, rate, attachments) are documented at
  <https://developers.cloudflare.com/email-service/platform/limits/>.
- Do not add a route or enable the `workers.dev` URL for this Worker: anyone who
  can reach it could send mail from the onboarded domain.

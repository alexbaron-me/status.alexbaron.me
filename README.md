# HTTP Status Code Redirect Service

A simple utility service running at `status.alexbaron.me` that redirects HTTP
status code queries to their corresponding MDN documentation pages.

## What it does

When you visit a URL like `https://status.alexbaron.me/418`, the service
automatically redirects you to the MDN documentation for HTTP status code 418
(I'm a teapot). This works for any valid HTTP status code.

## Why it exists

Looking up HTTP status codes, especially the less common ones, is an annoying
part of debugging legacy APIs. This service saves a few seconds by providing a
quick, memorable way to jump directly to the official MDN documentation without
having to search for it manually, keeping you in the flow.

## Usage

Simply append any HTTP status code to the base URL:

```
https://status.alexbaron.me/{status_code}
```

### Examples

- `https://status.alexbaron.me/404` &#8594; docs for 404 Not Found
- `https://status.alexbaron.me/503` &#8594; docs for 503 Service Unavailable
- `https://status.alexbaron.me/418` &#8594; docs for 418 I'm a teapot

## Technical Details

The service is deployed on Cloudflare Workers and performs a simple redirect to
the appropriate MDN documentation page based on the status code provided in the
URL path.

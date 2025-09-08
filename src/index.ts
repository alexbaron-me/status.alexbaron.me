import { parse } from 'marked';
import readme from '../README.md';

const targetBaseUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status';
const readmeHtml = parse(readme) as string;

type Handler = ExportedHandler<Env>['fetch'];

const statusCodeHandler: Handler = async (request, env, ctx) => {
	const url = new URL(request.url);

	try {
		const clearedPath = url.pathname.replace(/^\/+|\/+$/g, '');
		const statusCode = Number.parseInt(clearedPath);

		if (Number.isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
			throw new Error('Invalid status code'); // Trigger catch block
		}

		return Response.redirect(`${targetBaseUrl}/${statusCode}`, 302);
	} catch {
		return new Response('Invalid status code', { status: 400 });
	}
}

// Display project README
const rootHandler: Handler = async (request, env, ctx) => {
	return new Response(readmeHtml, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
		},
	});
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		// Redirect to HTTPS in production
		if (env.ENV === 'production' && url.protocol !== 'https:') {
			url.protocol = 'https:';
			return new Response(null, {
				status: 301,
				headers: {
					'Location': url.toString(),
				},
			})
		}

		if (url.pathname.trim() === '/' || url.pathname.trim() === '') {
			return rootHandler(request, env, ctx);
		} else {
			return statusCodeHandler(request, env, ctx);
		}
	},
} satisfies ExportedHandler<Env>;

const targetBaseUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status';

export default {
	async fetch(request, env, ctx): Promise<Response> {
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
	},
} satisfies ExportedHandler<Env>;

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
	const posts = await getCollection('events');

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((event) => ({
			title: event.data.title,
			description: event.data.socialDescription,
			pubDate: event.data.startDate,
			link: `/blog/${event.slug}/`
		})),
	});
}

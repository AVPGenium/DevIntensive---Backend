export default function canonize(url){
	const re = new RegExp('^(https?:)?(\/\/)?((www\.)?([a-z0-9_-]*\.)[^\/]*\/)?@?([a-z0-9\._]*)', 'i');
	const username = url.match(re)[6].toLowerCase();
	return '@' + username;
}

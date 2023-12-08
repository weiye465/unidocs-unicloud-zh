const routerMap = {
	'/uniCloud/database': '/clientdb.html',
	'/uniCloud/uni-clientDB': '/clientdb.html',

	'/uniCloud/uni-id-summary': '/uniCloud/uni-id/summary.html',
	'/uniCloud/uni-id-pages': '/uniCloud/uni-id/redirect.html',
	'/uniCloud/uni-id-common': '/uniCloud/uni-id/cloud-common.html',
	'/uniCloud/uni-id': '/uniCloud/uni-id/old.html',
	'/uniCloud/': '/'
};

export default ({ fullPath, path, hash }) => {
	fullPath = decodeURIComponent(fullPath);
	const matchFullPath =
		routerMap[fullPath.replace('?id=', '#').replace('.html', '')];
	if (matchFullPath) {
		return {
			path: matchFullPath,
			replace: true,
		};
	}

	const matchPath = routerMap[path] || routerMap[path.replace('.html', '')];
	if (matchPath) {
		return {
			path: matchPath,
			hash,
			replace: true,
		};
	}

	if (
		path.indexOf('/app-') === 0 ||
		path.indexOf('/android-') === 0 ||
		path.indexOf('/ios-') === 0
	) {
		return {
			path: `/tutorial${path}`,
			hash,
			replace: true,
		};
	}

	const routerMapKeys = Object.keys(routerMap);
	let returnPathConfig = null;
	routerMapKeys.forEach(key => {
		if (
			path.indexOf(key) === 0 &&
			routerMap[key].indexOf(key) !== 0 &&
			routerMap[key] !== path
		) {
			return (returnPathConfig = {
				path: path.replace(key, routerMap[key]),
				hash,
				replace: true,
			});
		}
	});
	if (returnPathConfig) return returnPathConfig;
};

module.exports = (ctx) => {
	console.log(ctx);
	return {
		plugins: {
			'autoprefixer': {
				browsers: ['last 2 versions', 'iOS >= 8', 'IE >= 11']
			},
			'cssnano': {}
		}
	}
}
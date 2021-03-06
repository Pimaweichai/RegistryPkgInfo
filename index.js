const registryUrl = require('registry-url');
const registryAuthToken = require('registry-auth-token');
const semver = require('semver');
const url = require('url');
const got = require('got');

module.exports = function(name, options={}){
    let regUrl = '';
    if (options.registry) {
        regUrl = options.registry
    } else {
        const scope = name.split('/')[0];
        regUrl = registryUrl(scope);
    }
    if(!regUrl) throw new Error('registry url doesn\'t exist');

	const pkgUrl = url.resolve(regUrl, encodeURIComponent(name).replace(/^%40/, '@'));
    const authInfo = registryAuthToken(regUrl, {recursive: true});
    const headers = { accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*' };

    options = Object.assign({ version: 'latest' }, options);
	if (options.fullMetadata) delete headers.accept;
    if (authInfo) headers.authorization = `${authInfo.type} ${authInfo.token}`;
    
	return got(pkgUrl, {json: true, headers, timeout:2000,retry:1})
		.then(res => {
			let data = res.body;
			let { version } = options;
            if (options.allVersions)  return data;
			if (data['dist-tags'][version]) {
				data = data.versions[data['dist-tags'][version]];
			} else if (version) {
				if (!data.versions[version]) {
					const versions = Object.keys(data.versions);
					version = semver.maxSatisfying(versions, version);
					if (!version) throw new Error('Version doesn\'t exist');
				}
				data = data.versions[version];
				if (!data) throw new Error('Version doesn\'t exist');
			}
			return data;
		})
		.catch(err => {
			if (err.statusCode === 404) throw new Error(`Package \`${name}\` doesn't exist`);
			throw err;
		});
};
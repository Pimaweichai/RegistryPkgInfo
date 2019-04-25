# RegistryPkgInfo

[![GitHub issues](https://img.shields.io/github/issues/Pimaweichai/RegistryPkgInfo.svg)](https://github.com/Pimaweichai/RegistryPkgInfo/issues)
[![GitHub forks](https://img.shields.io/github/forks/Pimaweichai/RegistryPkgInfo.svg)](https://github.com/Pimaweichai/RegistryPkgInfo/network)
[![GitHub stars](https://img.shields.io/github/stars/Pimaweichai/RegistryPkgInfo.svg)](https://github.com/Pimaweichai/RegistryPkgInfo/stargazers)
[![GitHub license](https://img.shields.io/github/license/Pimaweichai/RegistryPkgInfo.svg)](https://github.com/Pimaweichai/RegistryPkgInfo/blob/master/LICENSE)



## Install
```
npm install registry-pkg-info
```

## Demo

```  
const getRegistryPkgInfo = require('registry-pkg-info');

/* get the latest version package info from npm registry */

getRegistryPkgInfo('react',{
	registry:'http://registry.npmjs.org',
	version:'latest'
})
.then(function(data){
	console.dir(data);
})
.catch(function(e){
	console.log(e);
})
	
```

## Parameters

getRegistryPkgInfo ( pkgname, options );

parameter | description | default | required
----- | ----- | ----- | ----
pkgname | string | null | Y
options | object | { version:'latest', registry:'http://registry.npmjs.org' } | N

## License
registry-pkg-info is MIT licensed.
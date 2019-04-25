const getResitryVersion = require('../index');

getResitryVersion('react').then(function(data){
    console.log('react 远程最新版本信息:')
    console.dir(data);
}).catch(function(e){
    console.log('获取远程版本信息失败:')
    console.log(e);
})
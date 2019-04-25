const getResitryVersion = require('../index');

getResitryVersion('react').then(function(data){
    console.log('success:'+data);
}).catch(function(e){
    console.log('failed:'+e);
})
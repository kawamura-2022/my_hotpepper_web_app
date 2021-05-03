const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy("/hotpepper/gourmet/v1/", { target: "http://webservice.recruit.co.jp", changeOrigin: true, secure: false}));  

    app.use(proxy("/run_agent", { target: "http://host.docker.internal:5051", changeOrigin: true, secure: false}));  // APIにリクストが来ているか確認する用    
};
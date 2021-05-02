const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    const api_url = process.env.REACT_APP_API_URL_HOTPEPPER
    app.use(proxy("/api/call_hotpepper", { target: api_url,changeOrigin: true,secure: false}));  
};

// module.exports = function(app) {
//     const headers  = {
//         "Content-Type": "application/json",
//     }
//     const api_url = process.env.REACT_APP_API_URL_HOTPEPPER
//     app.use(proxy("/api/call_hotpepper", { target: api_url,changeOrigin: true,secure: false,headers: headers}));  
// };
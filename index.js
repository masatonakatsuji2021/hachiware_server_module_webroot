/**
 * ===================================================================================================
 * Hachiware_Server_module_webroot
 * 
 * Module for web server compatible with template engine of web server package "hachiware_server".
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_server_module_webroot
 * npm     : https://www.npmjs.com/package/hachiware_server_module_webroot
 * ===================================================================================================
 */

const hte = require("hachiware_te");

module.exports = function(conf, context){

    /**
     * fookRequest
     * @param {*} resolve 
     * @param {*} req 
     * @param {*} res 
     */
     this.fookRequest = function(resolve, req, res){

        if(!conf.webroots){
            return resolve();
        }

        if(!conf.webroots.path){
            conf.webroots.path = "webroot";
        }

        if(!conf.webroots.topPage){
            conf.webroots.topPage = "index.hte";
        }

        if(req.url == "/"){
            var file = conf.webroots.topPage;
        }
        else{
            var file = req.url + ".hte";
        }

        var path = conf.webroots.rootPath + "/" +conf.webroots.path;
        path = path.split("//").join("/");

        if(!conf.webroots.errorDebug){
            conf.webroots.errorDebug = false;
        }

        new hte({
            errorDebug: conf.webroots.errorDebug,
            path: path,
            load: file,
            request: req,
            response: res,
            callback: function(html, req, res, error){

                if(conf.webroots.callback){
                    conf.webroots.callback(html, req, res, error);
                }

                res.write(html);
                res.end();
            }
        });

     };
    
};
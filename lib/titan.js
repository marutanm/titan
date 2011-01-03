// ==============================================
// Global Variables & Functions
// ==============================================
// バージョン
var VERSION = '0.0.1';

// 実行関数
function run(port) {
    // モジュールの読み込み
    var express = require('express');
    
    // アプリケーションを生成
    var app = express.createServer();
    
    // アプリケーションのミドルウェアを設定
    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
    	app.use(express.logger());
    	app.use(express.bodyDecoder());
    	app.use(express.methodOverride());
    	app.use(express.staticProvider(__dirname + '/static'));
    });
    
    // 開発環境の設定
    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });
    
    // プロダクション環境の設定
    app.configure('production', function(){
      app.use(express.errorHandler()); 
    });

/*
    // ディスパッチテーブル
    app.get('/', titan.timeline());
    app.get('/:user', titan.user());
    app.get('/:user/status/:sid', titan.status());
    app.get('/settings', titan.settings());
    
    app.post('/settings/save',　titan.saveSettings());
    app.post('/update', yahotter.update());
    app.post('/fav', yahotter.fav());
*/
    
    // ポート番号の初期化
    port = port || 3000;
    // サーバーを起動
    app.listen(port);
    console.log('[ Titan Server v'+VERSION+' ] - Port '+port);
};



// ==============================================
// Titan Class
// ==============================================
Titan = function(){

};



// エクスポート
exports.version = VERSION;
exports.run = run;
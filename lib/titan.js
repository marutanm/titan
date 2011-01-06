// ==============================================
// Global Variables & Functions
// ==============================================

// モジュールの読み込み
// ----------------------------------------------
var sys = require("sys");
var express = require('express');
var mongodb = require('mongodb');


// バージョン
// ----------------------------------------------
var VERSION = '0.0.1';


// 実行関数
// ----------------------------------------------
function run(port) {
    var storage = new Titan.Storage();
    
    /*
    // アプリケーションを生成
    var app = _setup();
    
    // APIルーティング
    app.get('/api/timeline',            titan.api.timeline());
    app.get('/api/:user',               titan.api.user());
    app.get('/api/:user/status/:sid',   titan.api.status());
    app.get('/api/:user/profile',       titan.api.profile());
    app.post('/api/update',             titan.api.update());
    app.post('/api/fav',                titan.api.fav());
    // Streamingルーティング
    app.get('/stream',                  titan.stream.timeline());
    app.get('/stream/:user',            titan.stream.user());
    
    // ポート番号の初期化
    port = port || 3000;
    // サーバーを起動
    app.listen(port);
    console.log('[ Titan Server v'+VERSION+' ] - Port '+port);
    */
}


// セットアップ関数
// ----------------------------------------------
function _setup() {
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
    
    return app;
}



// ==============================================
// Titan Class
// ==============================================
Titan = function() {};


// ==============================================
// Titan Storage Class
// ==============================================
Titan.Storage = function() {
    var server, db;
    
    // MongoDBをセットアップ
    server = new mongodb.Server('localhost', 27017, {});
    db = new mongodb.Db('titan', server, { native_parser:true });
    
    // MongoDB接続用エラーハンドラ
    db.on('error', function(e) {
        console.log(e);
    });
    
    // MongoDBに接続
    db.open(function(err, db) {
        console.log(sys.inspect(err));
        console.log('Connected!');
    });
    
    // インスタンス変数を保存
    this.db = db;
};


// エクスポート
exports.version = VERSION;
exports.run = run;

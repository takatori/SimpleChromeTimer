$(function(){
    "use strict";

    var count = 0;
    var timer = 0;
	var running = false;
	var timerId;

    // 初期化
     function init (inputCount) {
        if (inputCount) {
            count = inputCount;
            $('#timer').text(count);            
        }         
    };

    // 開始・再開
    function start () {
        if (running) return;
	    running = true;
		countDown();
	};

    // timer 1秒ずつ減らす
	function countDown() {
       console.log(count);                    
        if (count > 0) {
            count--;
            $('#timer').text(count);
            timerId = window.setTimeout(function(){ // 無名関数で囲まないと動作しない
                countDown();
            }, 1000);
        } else {
            window.clearTimeout(timerId);                        
            running = false;            
            count = 0;
            timeUp();
        }
	};

    // タイムアップ
    function timeUp() {
        notify();
    }

    // 一時停止
    function stop() {
		if (!running) return;
		running = false;
        window.clearTimeout(timerId);
    };

    // リセット
	function reset() {
        if (running) running = false;
        window.clearTimeout(timerId);
        $('#timer').text('0');        
        count = 0;
    };

    
    // EventHandler ===========================
    $('#init').click(function(){
        init($('#counter').val());
    });

    $('#start').click(function(){
        start();
    });

    $('#stop').click(function(){
        stop();
    });

    $('#reset').click(function(){
        reset();
    });


    
    
    // Desktop Notification ======================
    window.addEventListener('load', function () {
        // 始めに、通知の許可を得ているかを確認しましょう
        // 得ていなければ、尋ねましょう
        if (Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }
            });
        }
    });

    function notify () {
        // 通知されることにユーザが同意している場合
        if (Notification && Notification.permission === "granted") {
            var n = new Notification("Time Up!");
        }

        // 通知を受けたいか否かをユーザが告げていない場合
        // 注記: Chrome のために permission プロパティが設定されているかの確信が
        // 持てないため、値 "default" を確認するのは安全ではありません。
        else if (Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status;
                }

                // ユーザが認めている場合
                if (status === "granted") {
                    var n = new Notification("Time Up!");
                }

                // 認めていなければ、通常型の alert にフォールバックします
                else {
                    alert("Time Up!");
                }
            });
        }

        // ユーザが通知を拒否している場合
        else {
            // 通常型の alert にフォールバックできます
            alert("Time Up!");
        }        
    }
});


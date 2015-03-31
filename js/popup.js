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
            //$('#timer').append('<h2>' + count + '</h2>');
            $('#timer').text(count);
            timerId = window.setTimeout(function(){ // 無名関数で囲わないと動作しない
                countDown();
            }, 1000);
        } else {
            window.clearTimeout(timerId);                        
            running = false;            
            count = 0;
        }
	};

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
});

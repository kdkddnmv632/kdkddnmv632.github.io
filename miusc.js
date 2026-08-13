        const bgm = document.getElementById('bgm');
        const startScreen = document.getElementById('startScreen');

        // 设置音量（0-1之间）
        bgm.volume = 0.8;

        // 首次交互触发
        function startAudio() {
            bgm.play().then(() => {
                console.log('音频开始播放');
            }).catch(err => {
                console.error('播放失败:', err);
            });
            
            // 隐藏引导层
            startScreen.style.display = 'none';
            
            // 移除监听器，避免重复触发
            document.removeEventListener('click', startAudio);
            document.removeEventListener('keydown', startAudio);
            document.removeEventListener('touchstart', startAudio);
        }

        // 监听多种交互事件
        document.addEventListener('click', startAudio);
        document.addEventListener('keydown', startAudio);
        document.addEventListener('touchstart', startAudio);
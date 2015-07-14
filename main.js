var onYouTubeIframeAPIReady = (function() {
    var scriptElement = document.createElement('script'), player, isUninserted = true, isUninitialized = true, firstScriptTag, waitingIndex,
        forEach = Function.prototype.call.bind(Array.prototype.forEach);

    scriptElement.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptElement, firstScriptTag);

    function detectSelection() {
        var hash = window.location.hash || window.location.search, index = parseInt(hash.length > 0 ? hash.substr(1) : '', 10);
        if (!isNaN(index)) {
            initializePlayer(index - 1);
        }
        return true;
    }

    function isHandheld() {
        var ua = navigator.userAgent;
        return ua.indexOf('ndroid') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPhone') > 0;
    }

    function getClickHandler(index) {
        return function onMenuClick(e) {
            e.preventDefault();

            if (isUninitialized) {
                if (isUninserted) {
                    initializePlayer(index);
                }
            } else {
                player.playVideoAt(index);
            }
        };
    }

    function onYouTubeIframeAPIReady() {
        // Map menu
        if (detectSelection() && isHandheld()) {
            initializePlayer();
        }

        var img = document.querySelector('figure img');
        if (img) {
            img.addEventListener('click', getClickHandler(0));
        }
        forEach(document.querySelectorAll('nav li'), function (item, index, obj) {
            item.addEventListener('click', getClickHandler(index));
        });
    }

    function initializePlayer(index) {
        document.querySelector('main figure').classList.remove('unstarted');
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            playerVars: {
                listType: 'playlist',
                list: 'PL5ZFe3UYmjm7m1h0bpMsmwweK4M-RFwV7',
                index: index,
                autoplay: 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        isUninserted = false;
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        //if (waitingIndex) { // Also OK to exclude index 0 here.
        //    player.playVideoAt(waitingIndex);
        //    waitingIndex = null;
        //}
        isUninitialized = false;
        //event.target.playVideo();
    }

    function onPlayerStateChange(event) {

    }
    return onYouTubeIframeAPIReady;
})();

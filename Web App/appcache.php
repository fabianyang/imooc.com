<!DOCTYPE html>
<html lang="en" manifest="manifest.appcache">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    <meta name="MobileOptimized" content="320">
    <title>app cache demo</title>
</head>

<body>
    <h1>APP Cache demo</h1>
    <img src="./img/1.jpg" />
    <!--cache文件中：img/1.jpg -->
    <img src="./img/2.jpg" />
    <script>
    window.addEventListener('load', function(e) {
        window.applicationCache.addEventListener('updateready', function(e) {
            console.log(window.applicationCache.status);
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('a new version of this site is available. load it ?')) {
                    window.location.reload();
                }

            } else {
                console.log('manifest not change ! nothing new to server ');
            }

        }, false);
    }, false);
    </script>
</body>

</html>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ranky Ranky</title>
        <link rel="stylesheet" href="/css/main.css">

    </head>
    <body>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '704784406288218',
            xfbml      : true,
            cookie     : true,
            version    : 'v2.4'
          });
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      </script>
        <div id="root"></div>
        <script>
          var csrf_token = '{{ csrf_token() }}';
        </script>
        <script src="/dist/main.js" charset="utf-8"></script>
    </body>
</html>

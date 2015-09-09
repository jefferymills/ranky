<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <link rel="stylesheet" href="/css/main.css">

    </head>
    <body>
        <div id="main"></div>
        <script src="dist/main.js" charset="utf-8"></script>
        <script>
          var csrf_token = '{{ csrf_token() }}';
        </script>
    </body>
</html>

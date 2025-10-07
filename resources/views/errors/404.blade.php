<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>404 - Page Not Found</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="css/app.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #fdd4d4;
      color: #1b1b1d;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      text-align: center;
    }

    h1 {
      font-size: clamp(3rem, 10vw, 6rem);
      margin-bottom: 1rem;
    }

    p {
      font-size: clamp(1rem, 2vw, 1.5rem);
      margin-bottom: 2rem;
    }

    a {
      padding: 0.75rem 1.5rem;
      background-color: #ff3368;
      color: #fff;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: background 0.3s;
    }

    a:hover {
      background-color: #e24175;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <a href="{{ route('home') }}">Go Home</a>
  </div>
</body>

</html>
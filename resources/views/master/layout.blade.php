<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="{{ asset('admin-assets/images/favicon.ico') }}">
    <title>{{ isset($title) ? $title : 'Page Title here' }}</title>
    <meta name="google-site-verification" content="cgP6vJOjcdp9_AHaSsIFtRjhDjBj5mW0Jn7IN9tzfZA" />
    <meta name="description" content="{{ isset($description) ? $description : 'Page description here' }}">
        @vite('resources/css/app.css')
        {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> --}}
        @stack('style')
</head>

<body class="font-sans bg-gray-50 leading-relaxed">
    {{-- header Section --}}
    @include('layout.header')
    {{-- header Section End --}}
    {{-- main Section --}}
    @hasSection('main')
        @yield('main')
    @else
        Add Section Here
    @endif
    {{-- main Section End --}}

    {{-- footer Section --}}
    @include('layout.footer')
    {{-- footer Section End --}}
    <script src="{{ asset('js/header.js') }}"></script>
    @stack('script')
</body>

</html>

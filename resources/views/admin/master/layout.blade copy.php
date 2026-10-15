<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpro Tools Dashboard</title>
    {{-- <link rel="icon" href="https://cdn.oaistatic.com/assets/favicon-miwirzcw.ico" sizes="32x32" /> --}}
    <link rel="stylesheet" href="{{ asset('admin-assets/css/output.css') }}">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Select2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <!-- Select2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <script defer src="{{ asset('admin-assets/js/toast.js') }}"></script>
</head>

<body class="bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Toast Notification Container -->
    <div id="toast-container" class="fixed top-18 right-4 z-50 space-y-4">
        <!-- Toast templates will be inserted here dynamically -->
    </div>
    <div class="flex h-screen overflow-hidden">
        <!-- Modern Sidebar -->
        @include('admin.layout.sideBar')
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Navbar -->
            @include('admin.layout.header')
            <!-- Main Content Area -->
            @hasSection('main')
                @yield('main')
            @else
                Add Main Section Here
            @endif
            <!-- Footer -->
            @include('admin.layout.footer')
        </div>
    </div>
    <!-- Add DataTables JS -->
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <!-- Before closing body -->
    <script src="{{ asset('admin-assets/js/tailwind.js') }}"></script>
    <script src="{{ asset('admin-assets/js/script.js') }}"></script>
    <script src="{{ asset('admin-assets/js/dataTables.js') }}"></script>

</body>

</html>

<header
    class="fixed z-1 border-b border-gray-200 dark:border-gray-700 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md ">
    <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center space-x-4">
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Overview</h1>
        </div>
        <div class="flex items-center space-x-4">
            <button id="dark-mode-toggle"
                class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none transition-colors">
                <svg class="size-6 moon dark:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M20.2496 14.1987C19.5326 14.3951 18.7782 14.5 18 14.5C13.3056 14.5 9.5 10.6944 9.5 5.99999C9.5 5.22185 9.60487 4.4674 9.80124 3.75043C6.15452 4.72095 3.46777 8.04578 3.46777 11.9981C3.46777 16.7114 7.28864 20.5323 12.0019 20.5323C15.9543 20.5323 19.2791 17.8455 20.2496 14.1987ZM20.5196 12.5328C19.7378 12.8346 18.8882 13 18 13C14.134 13 11 9.86598 11 5.99999C11 5.11181 11.1654 4.26226 11.4671 3.48047C11.6142 3.09951 11.7935 2.73464 12.0019 2.38923C12.0888 2.24526 12.1807 2.10466 12.2774 1.9677C12.1858 1.96523 12.094 1.96399 12.0019 1.96399C11.4758 1.96399 10.9592 2.00448 10.455 2.0825C5.64774 2.8264 1.96777 6.98251 1.96777 11.9981C1.96777 17.5398 6.46021 22.0323 12.0019 22.0323C17.0176 22.0323 21.1737 18.3523 21.9176 13.545C21.9956 13.0408 22.0361 12.5242 22.0361 11.9981C22.0361 11.906 22.0348 11.8141 22.0323 11.7226C21.8953 11.8193 21.7547 11.9112 21.6107 11.9981C21.2653 12.2065 20.9005 12.3858 20.5196 12.5328Z"
                        fill="currentColor"></path>
                    <path
                        d="M16.3333 5.33333L17.5 3L18.6667 5.33333L21 6.5L18.6667 7.66667L17.5 10L16.3333 7.66667L14 6.5L16.3333 5.33333Z"
                        fill="currentColor"></path>
                </svg>
                <svg class="size-6 sun dark:block" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.0002 3.29071V1.76746M5.8418 18.1585L4.7647 19.2356M12.0002 22.2326V20.7093M19.2357 4.76456L18.1586 5.84166M20.7095 12H22.2327M18.1586 18.1584L19.2357 19.2355M1.76758 12H3.29083M4.76462 4.7645L5.84173 5.8416M15.7123 8.2877C17.7626 10.338 17.7626 13.6621 15.7123 15.7123C13.6621 17.7626 10.338 17.7626 8.2877 15.7123C6.23745 13.6621 6.23745 10.338 8.2877 8.2877C10.338 6.23745 13.6621 6.23745 15.7123 8.2877Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
                </svg>
            </button>
            <div class="relative">
                <button id="user-menu-button" class="flex items-center space-x-2 focus:outline-none">
                    <span class="text-gray-700 dark:text-gray-200 hidden md:inline">{{ Auth::user()->name }}</span>
                    <img src="{{ asset('admin-assets/images/user.png') }}" alt="User" class="rounded-full w-8 h-8 object-cover">
                </button>
                <div id="user-menu"
                    class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                    <a href="{{ route('profile') }}"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Your
                        Profile</a>
                    <a href="{{ route('logout') }}"
                        class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <i class="fas fa-sign-out-alt me-2"></i>Logout</a>
                </div>
            </div>
        </div>
    </div>
</header>

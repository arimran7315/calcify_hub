<aside id="sidebar"
    class="sidebar-expanded sidebar-transition bg-white dark:bg-gray-800 shadow-lg flex flex-col border-r border-gray-200 dark:border-gray-700">
    <!-- Sidebar Header with Logo and Toggle -->
    <div class="px-4 py-3 flex items-center justify-between flex-row">
        <a href="{{ route('admin-home') }}">
            <div id="logo" class="flex items-center space-x-3 overflow-hidden">
                <div class="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_3"
                        data-name="Layer 3" viewBox="0 0 96.77 96.76" class="w-8">
                        <defs>
                            <style>
                                .cls-1 {
                                    fill: url(#radial-gradient);
                                }

                                .cls-2 {
                                    fill: #615fff;
                                }
                            </style>
                            <radialGradient id="radial-gradient" cx="413.41" cy="293.84" r="25.9"
                                gradientUnits="userSpaceOnUse">
                                <stop offset="0.46" stop-color="#615fff" stop-opacity="0.7" />
                                <stop offset="0.62" stop-color="#4447a9" stop-opacity="0.83" />
                                <stop offset="0.79" stop-color="#293258" stop-opacity="0.95" />
                                <stop offset="0.87" stop-color="#1e2939" />
                            </radialGradient>
                        </defs>
                        <path class="cls-1"
                            d="M450.79,301.34a37.76,37.76,0,1,1-.24-16.11H429.11a17.57,17.57,0,0,0-32.75,6.33,17.4,17.4,0,0,0,0,4.56,17.58,17.58,0,0,0,33.33,5.22Z"
                            transform="translate(-364.64 -245.46)" />
                        <path class="cls-2"
                            d="M376,293.84a37.76,37.76,0,0,0,20.33,33.5v14.88H364.64V245.46h31.65v14.88A37.76,37.76,0,0,0,376,293.84Z"
                            transform="translate(-364.64 -245.46)" />
                        <path class="cls-2"
                            d="M461.41,245.46v96.76H429.92V328a37.8,37.8,0,0,0,20.8-26.61h-21.1a17.58,17.58,0,0,1-33.33-5.22v-4.56A17.57,17.57,0,0,1,429,285.23h21.44a37.8,37.8,0,0,0-20.56-25.5V245.46Z"
                            transform="translate(-364.64 -245.46)" />
                    </svg>
                </div>
                <span id="logo-text" class="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">Calcify
                    Hub</span>
            </div>
        </a>
        <button id="toggle-sidebar"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-colors">
            <!-- Replace the Font Awesome icon with your SVG -->
            <svg class="sidebar-open hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none">
                <path
                    d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.97 2V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M7.96997 9.43994L10.53 11.9999L7.96997 14.5599" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg class="sidebar-close" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                viewBox="0 0 24 24" fill="none">
                <path
                    d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.96997 2V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M14.97 9.43994L12.41 11.9999L14.97 14.5599" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>

    <!-- Sidebar Content with Modern Navigation -->
    <div class="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav>
            <div class="px-4 mb-6">
                <p class="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-2 px-2 nav-item-title">
                    Menu</p>
                <ul class="space-y-1">
                    <li>
                        <a href="{{ route('admin-home') }}"
                            class="flex items-center space-x-3 p-2 rounded-lg sidebar-link {{ Route::currentRouteName() == 'admin-home' || Route::currentRouteName() == 'addPage' || Route::currentRouteName() == 'editPage' ? 'active-sidebar-link' : '' }}">
                            <div class="sidebar-icon w-6 text-center text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M15 18H9" stroke="currentColor" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </div>
                            <span class="sidebar-item text-gray-700 dark:text-gray-200 font-medium">Dashboard</span>
                        </a>
                    </li>
                    @cannot('editor')
                        <li>
                            <a href="{{ route('users') }}"
                                class="flex items-center space-x-3 p-2 rounded-lg sidebar-link {{ Route::currentRouteName() == 'users' ? 'active-sidebar-link' : '' }}">
                                <div class="sidebar-icon w-6 text-center text-gray-500 dark:text-gray-400">
                                    <svg class="size-5" viewBox="0 0 24 24" id="magicoon-Regular"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <title>users-three</title>
                                            <g id="users-three-Regular">
                                                <path id="users-three-Regular-2" data-name="users-three-Regular"
                                                    class="cls-1"
                                                    d="M12,13.75A4.75,4.75,0,1,0,7.25,9,4.756,4.756,0,0,0,12,13.75Zm0-8A3.25,3.25,0,1,1,8.75,9,3.254,3.254,0,0,1,12,5.75ZM18.75,18.4v.867A3.344,3.344,0,0,1,17.9,21.5a.749.749,0,0,1-1.058.059.75.75,0,0,1-.059-1.059,1.848,1.848,0,0,0,.469-1.233V18.4a2.688,2.688,0,0,0-2.013-2.626.756.756,0,0,0-.56.071,5.514,5.514,0,0,1-5.347,0,.771.771,0,0,0-.566-.076A2.69,2.69,0,0,0,6.75,18.4v.867A1.848,1.848,0,0,0,7.219,20.5a.75.75,0,1,1-1.117,1,3.344,3.344,0,0,1-.852-2.233V18.4A4.186,4.186,0,0,1,8.4,14.319a2.273,2.273,0,0,1,1.668.223,4.009,4.009,0,0,0,3.876,0,2.262,2.262,0,0,1,1.663-.22A4.186,4.186,0,0,1,18.75,18.4ZM17.293,4.921a.75.75,0,0,1,.957-.457A3.75,3.75,0,0,1,19.5,10.8a.75.75,0,0,1-1-1.118,2.251,2.251,0,0,0-.75-3.8A.749.749,0,0,1,17.293,4.921ZM21.75,15.833v.723a.75.75,0,0,1-1.5,0v-.723a2.114,2.114,0,0,0-1.583-2.067.75.75,0,1,1,.365-1.455A3.613,3.613,0,0,1,21.75,15.833ZM4.5,11.239A3.75,3.75,0,0,1,5.75,4.908a.75.75,0,0,1,.5,1.414,2.251,2.251,0,0,0-.75,3.8.75.75,0,1,1-1,1.118Zm.833,2.971A2.115,2.115,0,0,0,3.75,16.278V17a.75.75,0,0,1-1.5,0v-.722a3.615,3.615,0,0,1,2.718-3.523.75.75,0,1,1,.365,1.455Z">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span class="sidebar-item text-gray-700 dark:text-gray-200 font-medium">Users</span>
                            </a>
                        </li>
                    @endcannot
                </ul>
            </div>
        </nav>
    </div>

    <!-- Sidebar Footer with User Profile and Theme Toggle -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4 flex-row">
            <div id="footer-profile" class="flex items-center space-x-3">
                <img src="{{ asset('admin-assets/images/user.png') }}" alt="User"
                    class="rounded-full w-10 h-10 object-cover border-2 border-indigo-500">
                <div class="sidebar-item">
                    <p class="font-medium text-gray-800 dark:text-white">{{ Auth::user()->name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        {{ Auth::user()->user_role == '1' ? 'Admin' : (Auth::user()->user_role == '2' ? 'Manager' : 'Editor') }}
                    </p>
                </div>
            </div>
            <button id="sidebar-theme-toggle"
                class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-colors">
                <svg class="size-6 moon dark:hidden" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round">
                    </path>
                </svg>
            </button>
        </div>
        <a href="{{ route('logout') }}"
            class="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors focus:ring-red-400">
            <i class="fas fa-sign-out-alt text-white"></i>
            <span class="sidebar-item text-white font-medium">Logout</span>
        </a>
    </div>
</aside>

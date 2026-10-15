@extends('admin.master.layout')
@section('main')
    <main class="flex-1 overflow-y-auto px-6 pt-20 bg-gray-50 dark:bg-gray-900/50 custom-scrollbar">
        <div class="flex items-center space-x-3 mb-8">
            <!-- Home Item -->
            <a href="#" class="group relative flex flex-col items-center px-2 py-1 text-gray-600 dark:text-gray-300">
                <div class="flex items-center">
                    <!-- Dual Icons for Fade Effect -->
                    <div class="relative h-4 w-4 mr-1.5">
                        <svg class="absolute h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:opacity-0 transition-opacity duration-300"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="0.1"
                                    d="M8.976 3C4.05476 3 3 4.05476 3 8.976V15.024C3 19.9452 4.05476 21 8.976 21H9V9H21V8.976C21 4.05476 19.9452 3 15.024 3H8.976Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                                    stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M21 9L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M9 21L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                        <svg class="absolute h-4 w-4 text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="0.1"
                                    d="M8.976 3C4.05476 3 3 4.05476 3 8.976V15.024C3 19.9452 4.05476 21 8.976 21H9V9H21V8.976C21 4.05476 19.9452 3 15.024 3H8.976Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                                    stroke="currentColor" stroke-width="1.5"></path>
                                <path d="M21 9L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path d="M9 21L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                    <span
                        class="group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">Dashboard</span>
                </div>
                <!-- Underline Animation - perfectly aligned -->
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100"></span>
            </a>

            <!-- Chevron Separator -->
            <svg class="h-4 w-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <!-- Current Page (with pulse animation) -->
            <div class="group relative flex flex-col items-center px-2 py-1 text-indigo-600 dark:text-indigo-400">
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400 animate-pulse" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        <path d="M15 18H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <span class="font-medium">Home</span>
                </div>
                <!-- Persistent underline for current page - perfectly aligned -->
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400"></span>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            @cannot('editor')
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                    style="animation-delay: 0.1s">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">Active Users</p>
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $users }}</h3>
                        </div>
                        <div class="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                            <svg class="size-6" viewBox="0 0 24 24" id="magicoon-Regular" xmlns="http://www.w3.org/2000/svg"
                                fill="#4F46E5">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>users-three</title>
                                    <g id="users-three-Regular">
                                        <path id="users-three-Regular-2" data-name="users-three-Regular" class="cls-1"
                                            d="M12,13.75A4.75,4.75,0,1,0,7.25,9,4.756,4.756,0,0,0,12,13.75Zm0-8A3.25,3.25,0,1,1,8.75,9,3.254,3.254,0,0,1,12,5.75ZM18.75,18.4v.867A3.344,3.344,0,0,1,17.9,21.5a.749.749,0,0,1-1.058.059.75.75,0,0,1-.059-1.059,1.848,1.848,0,0,0,.469-1.233V18.4a2.688,2.688,0,0,0-2.013-2.626.756.756,0,0,0-.56.071,5.514,5.514,0,0,1-5.347,0,.771.771,0,0,0-.566-.076A2.69,2.69,0,0,0,6.75,18.4v.867A1.848,1.848,0,0,0,7.219,20.5a.75.75,0,1,1-1.117,1,3.344,3.344,0,0,1-.852-2.233V18.4A4.186,4.186,0,0,1,8.4,14.319a2.273,2.273,0,0,1,1.668.223,4.009,4.009,0,0,0,3.876,0,2.262,2.262,0,0,1,1.663-.22A4.186,4.186,0,0,1,18.75,18.4ZM17.293,4.921a.75.75,0,0,1,.957-.457A3.75,3.75,0,0,1,19.5,10.8a.75.75,0,0,1-1-1.118,2.251,2.251,0,0,0-.75-3.8A.749.749,0,0,1,17.293,4.921ZM21.75,15.833v.723a.75.75,0,0,1-1.5,0v-.723a2.114,2.114,0,0,0-1.583-2.067.75.75,0,1,1,.365-1.455A3.613,3.613,0,0,1,21.75,15.833ZM4.5,11.239A3.75,3.75,0,0,1,5.75,4.908a.75.75,0,0,1,.5,1.414,2.251,2.251,0,0,0-.75,3.8.75.75,0,1,1-1,1.118Zm.833,2.971A2.115,2.115,0,0,0,3.75,16.278V17a.75.75,0,0,1-1.5,0v-.722a3.615,3.615,0,0,1,2.718-3.523.75.75,0,1,1,.365,1.455Z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                    style="animation-delay: 0.2s">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">
                                {{ Auth::user()->user_role == 1 ? 'Managers' : 'Admins' }}</p>
                            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $manager }}</h3>
                        </div>
                        <div class="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M11 21H4C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                                    stroke="#007595" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                    style="animation-delay: 0.3s">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">Editors</p>
                            <h3 class="text-2xl font-bold text-zinc-800 dark:text-white">{{ $editor }}</h3>
                        </div>
                        <div class="bg-zinc-100 dark:bg-zinc-600 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M8.5 21H4C4 17.134 7.13401 14 11 14C11.1681 14 11.3348 14.0059 11.5 14.0176M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z"
                                    stroke="#3F3F47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            @endcannot
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                style="animation-delay: 0.4s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Pages</p>
                        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ count($pages) }}</h3>
                    </div>
                    <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6" fill="none">
                            <path
                                d="M13.0714 2.52927V6.83334C13.0714 7.93791 13.9668 8.83334 15.0714 8.83334H19.3494M13.0714 2.52927C12.7307 2.5095 12.3738 2.5 12 2.5C6.26471 2.5 4.5 4.73529 4.5 12C4.5 19.2647 6.26471 21.5 12 21.5C17.7353 21.5 19.5 19.2647 19.5 12C19.5 10.8146 19.453 9.76307 19.3494 8.83334M13.0714 2.52927L19.3494 8.83334"
                                stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                style="animation-delay: 0.5s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">Active Pages</p>
                        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $activePages }}</h3>
                    </div>
                    <div class="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15.0001 12L10.8001 16.2L9.00003 14.4M13.0714 2.52927V6.83334C13.0714 7.93791 13.9668 8.83334 15.0714 8.83334H19.3494M13.0714 2.52927C12.7307 2.5095 12.3738 2.5 12 2.5C6.26471 2.5 4.5 4.73529 4.5 12C4.5 19.2647 6.26471 21.5 12 21.5C17.7353 21.5 19.5 19.2647 19.5 12C19.5 10.8146 19.453 9.76307 19.3494 8.83334M13.0714 2.52927L19.3494 8.83334"
                                stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 card-hover transition-all duration-300 animate-fadeIn border border-gray-200 dark:border-gray-700"
                style="animation-delay: 0.6s">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-500 dark:text-gray-300 text-sm font-medium">Pending Pages</p>
                        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{{ count($pages) - $activePages }}
                        </h3>
                    </div>
                    <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none">
                            <!-- Document shape -->
                            <path
                                d="M13.0714 2.52927V6.83334C13.0714 7.93791 13.9668 8.83334 15.0714 8.83334H19.3494M13.0714 2.52927C12.7307 2.5095 12.3738 2.5 12 2.5C6.26471 2.5 4.5 4.73529 4.5 12C4.5 19.2647 6.26471 21.5 12 21.5C17.7353 21.5 19.5 19.2647 19.5 12C19.5 10.8146 19.453 9.76307 19.3494 8.83334M13.0714 2.52927L19.3494 8.83334"
                                stroke="#EAB308" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />

                            <!-- Clock icon centered in document -->
                            <circle cx="12" cy="14" r="3.5" stroke="#EAB308" stroke-width="1.2" />
                            <path d="M12 13V14.5L13 15" stroke="#EAB308" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="my-5 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">All Pages</h2>
                <div class="">
                    <a href="{{ route('addPage') }}"
                        class="rounded-lg px-3 py-2 bg-indigo-500 shadow-lg text-white hover:shadow-indigo-600 hover:bg-indigo-600 transition-all duration-300">Add
                        New Page</a>
                </div>

            </div>
            <div class="overflow-x-auto p-4">
                <table id="Datatable" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Url</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Title</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        @forelse ($pages as $page)
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {{ $page->url }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {{ $page->title }}</td>
                                <td>
                                    @if ($page->getRawOriginal('data') === '{}' || $page->getRawOriginal('data') === '"{}"')
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</span>
                                    @else
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</span>
                                    @endif
                                </td>
                                <td
                                    class="flex justify-center gap-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <a href="{{ route('editPage', $page->id) }}"
                                        class="text-emerald-600 font-medium p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24"
                                            fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M3.25 22C3.25 21.5858 3.58579 21.25 4 21.25H20C20.4142 21.25 20.75 21.5858 20.75 22C20.75 22.4142 20.4142 22.75 20 22.75H4C3.58579 22.75 3.25 22.4142 3.25 22Z"
                                                fill="currentColor" />
                                            <path
                                                d="M11.5201 14.929L11.5201 14.9289L17.4368 9.01225C16.6315 8.6771 15.6777 8.12656 14.7757 7.22455C13.8736 6.32238 13.323 5.36846 12.9879 4.56312L7.07106 10.4799L7.07101 10.48C6.60932 10.9417 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.04356 16.8833C3.94194 17.1882 4.02128 17.5243 4.2485 17.7515C4.47573 17.9787 4.81182 18.0581 5.11667 17.9564L8.38334 16.8676C9.00281 16.6611 9.31256 16.5578 9.60398 16.4189C9.94775 16.2551 10.2727 16.0543 10.5729 15.8201C10.8275 15.6215 11.0584 15.3907 11.5201 14.929Z"
                                                fill="currentColor" />
                                            <path
                                                d="M19.0786 7.37044C20.3071 6.14188 20.3071 4.14999 19.0786 2.92142C17.85 1.69286 15.8581 1.69286 14.6296 2.92142L13.9199 3.63105C13.9296 3.6604 13.9397 3.69015 13.9502 3.72028C14.2103 4.47 14.701 5.45281 15.6243 6.37602C16.5475 7.29923 17.5303 7.78999 18.28 8.05009C18.31 8.0605 18.3396 8.07054 18.3688 8.08021L19.0786 7.37044Z"
                                                fill="currentColor" />
                                        </svg>
                                    </a>
                                    <button class="open-modal text-red-500 p-2" data-modal="delete-page-modal"
                                        data-page-id="{{ $page->id }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24"
                                            fill="none">
                                            <path
                                                d="M3 6.52381C3 6.12932 3.32671 5.80952 3.72973 5.80952H8.51787C8.52437 4.9683 8.61554 3.81504 9.45037 3.01668C10.1074 2.38839 11.0081 2 12 2C12.9919 2 13.8926 2.38839 14.5496 3.01668C15.3844 3.81504 15.4756 4.9683 15.4821 5.80952H20.2703C20.6733 5.80952 21 6.12932 21 6.52381C21 6.9183 20.6733 7.2381 20.2703 7.2381H3.72973C3.32671 7.2381 3 6.9183 3 6.52381Z"
                                                fill="currentColor" />
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M11.5956 22H12.4044C15.1871 22 16.5785 22 17.4831 21.1141C18.3878 20.2281 18.4803 18.7749 18.6654 15.8685L18.9321 11.6806C19.0326 10.1036 19.0828 9.31511 18.6289 8.81545C18.1751 8.31579 17.4087 8.31579 15.876 8.31579H8.12404C6.59127 8.31579 5.82488 8.31579 5.37105 8.81545C4.91722 9.31511 4.96744 10.1036 5.06788 11.6806L5.33459 15.8685C5.5197 18.7749 5.61225 20.2281 6.51689 21.1141C7.42153 22 8.81289 22 11.5956 22ZM10.2463 12.1885C10.2051 11.7546 9.83753 11.4381 9.42537 11.4815C9.01321 11.5249 8.71251 11.9117 8.75372 12.3456L9.25372 17.6087C9.29494 18.0426 9.66247 18.3591 10.0746 18.3157C10.4868 18.2724 10.7875 17.8855 10.7463 17.4516L10.2463 12.1885ZM14.5746 11.4815C14.9868 11.5249 15.2875 11.9117 15.2463 12.3456L14.7463 17.6087C14.7051 18.0426 14.3375 18.3591 13.9254 18.3157C13.5132 18.2724 13.2125 17.8855 13.2537 17.4516L13.7537 12.1885C13.7949 11.7546 14.1625 11.4381 14.5746 11.4815Z"
                                                fill="currentColor" />
                                        </svg>
                                    </button>
                                </td>
                            @empty
                                No Record Found
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <!-- Delete Modal -->
    <div id="delete-page-modal" class="modal hidden fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50">
        <div
            class="border-b-1 border-gray-400 modal-content bg-white dark:bg-gray-800 text-gray-800 dark:text-white mx-auto mt-[8%] p-6 rounded-lg w-11/12 max-w-xl relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-5 h-6 absolute top-2 right-2 cursor-pointer close-btn">
                <path fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
            <h2
                class="text-xl font-bold mb-4 pb-2 border-b dark:border-gray-700 border-gray-300 text-gray-700 dark:text-gray-200">
                Delete Page</h2>
            <form id="delete-page-form" class="space-y-4 border-1 border-indigo-200" method="POST">
                @csrf
                @method('DELETE')
                <p class="py-3 text-2xl">
                    This will delete the page permanently.
                </p>
                <span class="text-md">Do you really want to proceed?</span>
                <div class="flex justify-between">
                    <button type="button"
                        class="close-modal px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300">Cancle</button>
                    <button id="delete-page" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                        Proceed
                    </button>
                </div>
            </form>
        </div>
    </div>
       <script>
        // Setup: when trash icon is clicked
        document.querySelectorAll('.open-modal[data-modal="delete-page-modal"]').forEach(button => {
            button.addEventListener('click', function() {
                const pageId = this.getAttribute('data-page-id');
                const modal = document.getElementById('delete-page-modal');
                const form = document.getElementById('delete-page-form');

                // Set form action
                form.setAttribute('action', `/pages/${pageId}`);

                // Show modal
                modal.classList.remove('hidden');
            });
        });

        // Optional: Close modal on cancel or close button
        document.querySelectorAll('.close-modal, .close-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.getElementById('delete-page-modal').classList.add('hidden');
            });
        });
    </script>
@endsection

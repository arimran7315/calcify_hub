@extends('admin.master.layout')
@section('main')
    <main class="flex-1 overflow-y-auto px-6 pt-24 bg-gray-50 dark:bg-gray-900/50 custom-scrollbar">
        <div class="flex items-center space-x-3 mb-8">
            <!-- Home Item -->
            <a href="#" class="group relative flex flex-col items-center px-2 py-1 text-gray-600 dark:text-gray-300">
                <div class="flex items-center">
                    <!-- Dual Icons for Fade Effect -->
                    <div class="relative h-4 w-4 mr-1.5">
                        <svg class="absolute h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:opacity-0 transition-opacity duration-300"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M15 18H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <svg class="absolute h-4 w-4 text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M15 18H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </div>
                    <span class="group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">Home</span>
                </div>
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100"></span>
            </a>
            <svg class="h-4 w-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>

            <a href="#" class="group relative flex flex-col items-center px-2 py-1 text-gray-600 dark:text-gray-300">
                <div class="flex items-center">
                    <div class="relative h-4 w-4 mr-1.5">
                        <svg fill="currentColor"
                            class="absolute h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:opacity-0 transition-opacity duration-300"
                            viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M19.5 2c-.276.004-.504.224-.5.5v4c0 .815.656 1.5 1.47 1.5h4.03c.67 0 .654-1 0-1h-4.03c-.26 0-.47-.207-.47-.5v-4c.004-.282-.218-.504-.5-.5zM8.47 0C7.657 0 7 .685 7 1.5v23c0 .815.656 1.5 1.47 1.5h17.06c.814 0 1.47-.685 1.47-1.5v-18c0-.133-.053-.26-.146-.354l-6-6C20.76.053 20.634 0 20.5 0zm0 1h11.823L26 6.707V24.5c0 .293-.21.5-.47.5H8.47c-.26 0-.47-.207-.47-.5v-23c0-.293.21-.5.47-.5zm-4 3C3.657 4 3 4.685 3 5.5v23c0 .815.656 1.5 1.47 1.5h17.06c.814 0 1.47-.685 1.47-1.5v-1c.01-.676-1.01-.676-1 0v1c0 .293-.21.5-.47.5H4.47c-.26 0-.47-.207-.47-.5v-23c0-.293.21-.5.47-.5h1.06c.675.01.675-1.01 0-1z">
                                </path>
                            </g>
                        </svg>
                        <svg fill="currentColor"
                            class="absolute h-4 w-4 text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M19.5 2c-.276.004-.504.224-.5.5v4c0 .815.656 1.5 1.47 1.5h4.03c.67 0 .654-1 0-1h-4.03c-.26 0-.47-.207-.47-.5v-4c.004-.282-.218-.504-.5-.5zM8.47 0C7.657 0 7 .685 7 1.5v23c0 .815.656 1.5 1.47 1.5h17.06c.814 0 1.47-.685 1.47-1.5v-18c0-.133-.053-.26-.146-.354l-6-6C20.76.053 20.634 0 20.5 0zm0 1h11.823L26 6.707V24.5c0 .293-.21.5-.47.5H8.47c-.26 0-.47-.207-.47-.5v-23c0-.293.21-.5.47-.5zm-4 3C3.657 4 3 4.685 3 5.5v23c0 .815.656 1.5 1.47 1.5h17.06c.814 0 1.47-.685 1.47-1.5v-1c.01-.676-1.01-.676-1 0v1c0 .293-.21.5-.47.5H4.47c-.26 0-.47-.207-.47-.5v-23c0-.293.21-.5.47-.5h1.06c.675.01.675-1.01 0-1z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <span
                        class="group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">Pages</span>
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
                    <svg class="cf-icon-svg h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400 animate-pulse" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
                        enable-background="new 0 0 100 100" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path
                                        d="M67.041,78.553h-6.49h0c-0.956,0-1.73,0.774-1.73,1.73h-0.007v3.01H18.173V36.16h17.723c0.956,0,1.73-0.774,1.73-1.73 V16.707h21.188l0,12.34h0.016c0.047,0.913,0.796,1.641,1.721,1.641h6.49c0.925,0,1.674-0.728,1.721-1.641h0.009v-0.088 c0,0,0-0.001,0-0.001c0-0.001,0-0.001,0-0.002l0-16.457h-0.005V8.48c0-0.956-0.774-1.73-1.73-1.73h-2.45v0H35.895v0h-1.73 L8.216,32.7v2.447v1.013v52.912v2.447c0,0.956,0.774,1.73,1.73,1.73h1.582h53.925h1.582c0.956,0,1.73-0.774,1.73-1.73v-2.448 h0.005l0-8.789l0-0.001C68.771,79.328,67.997,78.553,67.041,78.553z">
                                    </path>
                                </g>
                                <g>
                                    <path
                                        d="M91.277,39.04L79.656,27.419c-0.676-0.676-1.771-0.676-2.447,0L45.404,59.224l0.069,0.069l-0.109-0.029l-4.351,16.237 l0.003,0.001c-0.199,0.601-0.066,1.287,0.412,1.765c0.528,0.528,1.309,0.638,1.948,0.341l0.002,0.006l16.08-4.309l-0.01-0.037 l0.023,0.024l31.806-31.806C91.953,40.811,91.953,39.716,91.277,39.04z M46.305,72.353l2.584-9.643l7.059,7.059L46.305,72.353z">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span class="font-medium">Edit Page</span>
                </div>
                <!-- Persistent underline for current page - perfectly aligned -->
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400"></span>
            </div>
        </div>
        <div class="max-w-5xl mx-auto px-4 mb-4">
            <form action="{{ route('updatePage-function', $page->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="grid grid-cols-2 gap-8 text-gray-700 dark:text-gray-200">
                    <div class="mt-4">
                        <label for="Url">Url:</label>
                        <input type="text" placeholder="/index" name="url"
                            class="mb-3 w-full px-4 py-2 @error('url')
                                  border-red-500
                                @enderror border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300"
                            value="{{ $page->url }}">
                        @error('url')
                            <p class="text-red-500">
                                {{ $message }}
                            </p>
                        @enderror
                        <label for="Title">Title:</label>
                        <input type="text" placeholder="Home Page" name="title"
                            class="mb-3 w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300"
                            value="{{ $page->title }}">
                        <label for="Title">Description:</label>
                        <input type="text" placeholder="Home Page" name="description"
                            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300"
                            value="{{ $page->description }}">
                        <div class="mt-4">
                            <button
                                class="py-2 px-3 bg-green-400 font-medium text-white rounded-lg hover:bg-green-500 transition-all duration-300">
                                Update
                            </button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="grid grid-cols-2 gap-6">
                            <label for="key">Key</label>
                            <label for="key">Value</label>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-3" id="data">
                            @php
                                $decodedData = json_decode($page->data ?? '{}', true);
                            @endphp
                            @forelse ($decodedData as $key => $value)
                                <input type="text" name="key[]" value="{{ $key }}" placeholder="Key"
                                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0" />
                                <input type="text" name="value[]" value="{{ $value }}" placeholder="Value"
                                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0" />
                            @empty
                                <input type="text" placeholder="Keys" readonly
                                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0">
                                <input type="text" placeholder="Values" readonly
                                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0">
                            @endforelse
                        </div>

                    </div>
                </div>

            </form>
            <div class="flex justify-end">
                <button id="addBtn"
                    class="py-2 px-3 bg-green-400 font-medium text-white rounded-lg hover:bg-green-500 transition-all duration-300">
                    Add New
                </button>
            </div>
        </div>
    </main>
    <script>
        document.getElementById('addBtn').addEventListener('click', function() {
            const dataDiv = document.getElementById('data');

            // Create key input
            const keyInput = document.createElement('input');
            keyInput.type = 'text';
            keyInput.name = 'key[]';
            keyInput.placeholder = 'Key';
            keyInput.className =
                'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300';
            dataDiv.appendChild(keyInput);

            // Create value input
            const valueInput = document.createElement('input');
            valueInput.type = 'text';
            valueInput.name = 'value[]';
            valueInput.placeholder = 'Value';
            valueInput.className =
                'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300';
            dataDiv.appendChild(valueInput);
        });
    </script>
@endsection

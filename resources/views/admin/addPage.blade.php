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
                <!-- Underline Animation - perfectly aligned -->
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 origin-center scale-x-0 group-hover:scale-x-100"></span>
            </a>

            <!-- Chevron Separator -->
            <svg class="h-4 w-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>

            <!-- Products Item -->
            <a href="#" class="group relative flex flex-col items-center px-2 py-1 text-gray-600 dark:text-gray-300">
                <div class="flex items-center">
                    <!-- Dual Icons for Fade Effect -->
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

                    <svg fill="currentColor" wviewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"
                        class="cf-icon-svg h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400 animate-pulse">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M11.16 16.153a.477.477 0 0 1-.476.475H1.316a.477.477 0 0 1-.475-.475V3.046a.477.477 0 0 1 .475-.475h6.95l2.893 2.893zm-1.11-9.924H8.059a.575.575 0 0 1-.574-.574V3.679H1.95v11.84h8.102zm-1.519 4.198a.475.475 0 0 1-.475.475H6.475v1.582a.475.475 0 1 1-.95 0v-1.582H3.944a.475.475 0 0 1 0-.95h1.581v-1.58a.475.475 0 0 1 .95 0v1.58h1.581a.475.475 0 0 1 .475.475z">
                            </path>
                        </g>
                    </svg>
                    <span class="font-medium">Add New Page</span>
                </div>
                <!-- Persistent underline for current page - perfectly aligned -->
                <span
                    class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-0.5rem)] h-0.5 bg-indigo-500 dark:bg-indigo-400"></span>
            </div>
        </div>
        <div class="max-w-5xl mx-auto px-4">
            <form action="{{ route('addPage-function') }}" method="POST">
                @csrf
                <div class="grid grid-cols-2 gap-8">
                    <div class="mt-4 text-gray-700 dark:text-gray-200">
                        <label for="Url">Url:</label>
                        <input type="text" placeholder="/index" name="url"
                            class="mb-3 w-full px-4 py-2 @error('url')
                                  border-red-500
                                @enderror border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300">
                        @error('url')
                            <p class="text-red-500">
                                {{ $message }}
                            </p>
                        @enderror
                        <div class="relative mx-auto mb-3">
                            <label for="parent">Select Parent</label>
                            <div class="relative">
                                <input type="text" placeholder="Search pages..."
                                    class="mt-1 block w-full p-2 rounded-md border-2 border-gray-200  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                                    style="outline:none;" id="searchInput" />
                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>

                            <div id="optionsContainer"
                                class="hidden absolute z-10 w-full mt-1 text-gray-700 dark:bg-gray-700 dark:text-white bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                <!-- Options will be dynamically inserted here -->
                            </div>
                        </div>

                        <!-- Hidden field to store selected page ID -->
                        <input type="hidden" id="selectedPageId" name="page_id">
                        <label for="Title">Title:</label>
                        <input type="text" placeholder="Home Page" name="title" id="title"
                            class="mb-3 w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300">
                        <label for="Title">Description:</label>
                        <input type="text" placeholder="Home Page" name="description" id="description"
                            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300">
                        <div class="mt-4">
                            <button
                                class="py-2 px-3 bg-green-400 font-medium text-white rounded-lg hover:bg-green-500 transition-all duration-300">
                                Create
                            </button>
                        </div>
                    </div>
                    <div class="mt-4 text-gray-700 dark:text-white">
                        <div class="grid grid-cols-2 gap-6">
                            <label for="key">Key</label>
                            <label for="key">Value</label>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-3" id="data">
                            <input type="text" placeholder="Keys" readonly
                                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0">
                            <input type="text" placeholder="Values" readonly
                                class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0">
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
    <script>
        const searchInput = document.getElementById('searchInput');
        const optionsContainer = document.getElementById('optionsContainer');
        const selectedPageId = document.getElementById('selectedPageId');
        const dynamicFieldsContainer = document.getElementById('data');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        let options = [];

        // Fetch pages data from API
        async function fetchOptions() {
            try {
                const response = await fetch('/getparent');
                const data = await response.json();

                if (data.status && data.pages) {
                    options = data.pages.map(page => ({
                        value: page.id.toString(),
                        label: page.title
                    }));
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        }

        // Fetch page data by ID
        async function fetchPageData(pageId) {
            try {
                const response = await fetch(`/getdata/${pageId}`);
                const data = await response.json();

                if (data.status && data.data) {
                    title.value=data.title;
                    description.value = data.description;
                    updateDynamicFields(data.data);
                }
            } catch (error) {
                console.error('Error fetching page data:', error);
            }
        }

        // Update dynamic fields with new data (without sub-divs)
        function updateDynamicFields(pageData) {
            dynamicFieldsContainer.innerHTML = '';

            if (pageData.length !== 0) {
                pageData.forEach(item => {
                    // Create key input
                    const keyInput = document.createElement('input');
                    keyInput.type = 'text';
                    keyInput.name = 'key[]';
                    keyInput.value = item.key;
                    keyInput.placeholder = 'Key';
                    keyInput.className = 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0';
                    dynamicFieldsContainer.appendChild(keyInput);

                    // Create value input
                    const valueInput = document.createElement('input');
                    valueInput.type = 'text';
                    valueInput.name = 'value[]';
                    valueInput.value = item.value;
                    valueInput.placeholder = 'Value';
                    valueInput.className = 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-0';
                    dynamicFieldsContainer.appendChild(valueInput);
                });
            }
        }

        function renderOptions(filter = '') {
            optionsContainer.innerHTML = '';
            const filteredOptions = options.filter(option =>
                option.label.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredOptions.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'px-4 py-2 text-gray-500';
                noResults.textContent = 'No results found';
                optionsContainer.appendChild(noResults);
            } else {
                filteredOptions.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'px-4 py-2 dark:hover:bg-gray-600 hover:bg-blue-50 cursor-pointer';
                    optionElement.textContent = option.label;
                    optionElement.addEventListener('click', () => {
                        searchInput.value = option.label;
                        selectedPageId.value = option.value;
                        optionsContainer.classList.add('hidden');
                        fetchPageData(option.value);
                    });
                    optionsContainer.appendChild(optionElement);
                });
            }
        }

        // Initialize the component
        document.addEventListener('DOMContentLoaded', async () => {
            await fetchOptions();

            searchInput.addEventListener('focus', () => {
                optionsContainer.classList.remove('hidden');
                renderOptions();
            });

            searchInput.addEventListener('input', (e) => {
                renderOptions(e.target.value);
            });

            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !optionsContainer.contains(e.target)) {
                    optionsContainer.classList.add('hidden');
                }
            });
        });
    </script>
@endsection

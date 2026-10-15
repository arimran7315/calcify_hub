    @section('main')
        @push('style')
            <style>
                .drag-handle {
                    cursor: move;
                }

                .drag-handle:hover {
                    color: #3b82f6;
                }

                .drag-placeholder {
                    height: 4px;
                    background-color: #3b82f6;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 4px 0;
                    border-radius: 2px;
                }
            </style>
        @endpush
        <div class="container mx-auto py-8 px-4 max-w-7xl">
            <header class="text-center mb-10">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">Image to PDF Converter</h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">Convert your images to professional PDF documents with
                    customizable layouts</p>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Panel - Upload and Settings -->
                <div class="space-y-6">
                    <!-- Upload Images -->
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-xl font-semibold text-gray-800">Upload Images</h2>
                            <span class="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                                <span>Total size: <span id="total-size">0 KB</span></span>
                            </span>
                        </div>

                        <div id="drop-zone"
                            class="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer mb-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                    </path>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold text-blue-600">Click to
                                        upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500">PNG, JPG (Max 5MB each)</p>
                            </div>
                            <input id="file-upload" type="file" class="hidden" multiple accept="image/*">
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-xs bg-gray-100 text-gray-500 py-1 px-2 rounded-full" id="file-counter">No
                                files selected</span>
                            <button id="clear-all"
                                class="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                                disabled>Clear
                                all</button>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                        <div class="p-4 border-b flex justify-between items-center">
                            <h2 class="text-lg font-semibold text-gray-800">Image List</h2>
                            <span class="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full" id="image-count">0
                                images</span>
                        </div>
                        <div id="image-list" class="p-2 h-[300px] overflow-y-auto">
                            <div
                                class="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-100 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm">Upload images to get started</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Middle Panel - Image List -->
                <div class="rounded-xl shadow-sm overflow-hidden">
                    <!-- PDF Settings -->
                    <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-xl font-semibold text-gray-800">PDF Settings</h2>
                            <span class="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Recommended</span>
                        </div>

                        <div class="space-y-5">
                            <div>
                                <label for="page-size" class="block text-sm font-medium text-gray-700 mb-1">Page
                                    Size</label>
                                <select id="page-size"
                                    class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2 px-3 border">
                                    <option value="a4">A4 (210 × 297 mm)</option>
                                    <option value="letter">Letter (216 × 279 mm)</option>
                                    <option value="legal">Legal (216 × 356 mm)</option>
                                    <option value="a5">A5 (148 × 210 mm)</option>
                                </select>
                            </div>

                            <div>
                                <label for="orientation"
                                    class="block text-sm font-medium text-gray-700 mb-1">Orientation</label>
                                <div class="grid grid-cols-2 gap-3">
                                    <label class="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="orientation" id="orientation-portrait" value="portrait"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked>
                                        <span class="text-sm text-gray-700">Portrait</span>
                                    </label>
                                    <label class="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="orientation" id="orientation-landscape"
                                            value="landscape"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                        <span class="text-sm text-gray-700">Landscape</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Margins</label>
                                <div class="grid grid-cols-2 gap-3">
                                    <label class="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="margin" id="margin-none" value="0"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" checked>
                                        <span class="text-sm text-gray-700">No Margin</span>
                                    </label>
                                    <label class="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="margin" id="margin-small" value="15"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                                        <span class="text-sm text-gray-700">Small Margin (15mm)</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Image Scaling</label>
                                <div class="flex flex-col space-y-2">
                                    <button id="fit-contain"
                                        class="flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <div>
                                            <div class="font-medium">Fit to Page</div>
                                            <div class="text-xs text-blue-700">Whole image visible with borders</div>
                                        </div>
                                    </button>
                                    <button id="fit-cover"
                                        class="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200 transition text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 320 301.25"
                                            class="h-4 w-4 mr-2">

                                            <g stroke-linecap="round" transform="translate(10 10) rotate(0 150 140.625)">
                                                <path
                                                    d="M32 0 M32 0 C98.29 0, 164.59 0, 268 0 M32 0 C94.54 0, 157.07 0, 268 0 M268 0 C289.33 0, 300 10.67, 300 32 M268 0 C289.33 0, 300 10.67, 300 32 M300 32 C300 77.5, 300 123, 300 249.25 M300 32 C300 100.63, 300 169.27, 300 249.25 M300 249.25 C300 270.58, 289.33 281.25, 268 281.25 M300 249.25 C300 270.58, 289.33 281.25, 268 281.25 M268 281.25 C197.24 281.25, 126.48 281.25, 32 281.25 M268 281.25 C199.37 281.25, 130.75 281.25, 32 281.25 M32 281.25 C10.67 281.25, 0 270.58, 0 249.25 M32 281.25 C10.67 281.25, 0 270.58, 0 249.25 M0 249.25 C0 186.03, 0 122.81, 0 32 M0 249.25 C0 171.83, 0 94.41, 0 32 M0 32 C0 10.67, 10.67 0, 32 0 M0 32 C0 10.67, 10.67 0, 32 0"
                                                    stroke="currentColor" stroke-width="4" fill="none" />
                                            </g>
                                            <g stroke-linecap="round" transform="translate(10 50) rotate(0 150 100)">
                                                <path d="M0 0 L300 0 L300 200 L0 200" stroke="none" stroke-width="0"
                                                    fill="currentColor" />
                                                <path
                                                    d="M0 0 C84.51 0, 169.02 0, 300 0 M0 0 C80.82 0, 161.64 0, 300 0 M300 0 C300 44.01, 300 88.02, 300 200 M300 0 C300 65.43, 300 130.86, 300 200 M300 200 C180.42 200, 60.85 200, 0 200 M300 200 C213.33 200, 126.66 200, 0 200 M0 200 C0 159.51, 0 119.03, 0 0 M0 200 C0 154.57, 0 109.13, 0 0"
                                                    stroke="transparent" stroke-width="2" fill="none" />
                                            </g>
                                        </svg>
                                        <div>
                                            <div class="font-medium">Fill Page</div>
                                            <div class="text-xs text-blue-700">Crop edges to fill entire page</div>
                                        </div>
                                    </button>
                                    <button id="fit-actual"
                                        class="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200 transition text-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                                        </svg>
                                        <div>
                                            <div class="font-medium">Original Size</div>
                                            <div class="text-xs text-blue-700">Use image dimensions (scaled to fit)</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Panel - PDF Preview -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="">
                        <button id="generate-pdf"
                            class="mb-4 w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled>
                            <span id="generate-icon" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                </svg>
                                <span>Generate PDF Now</span>
                            </span>
                            <span id="generate-loading" class="hidden flex items-center">
                                <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10"
                                        stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                <span>Generating...</span>
                            </span>

                        </button>
                    </div>
                    <div class="p-4 border-b flex justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800">PDF Preview</h2>
                        <div class="flex items-center text-sm text-gray-500">
                            <span id="preview-scale">100%</span>
                            <span class="mx-2">•</span>
                            <span id="page-count">0 pages</span>
                        </div>
                    </div>
                    <div class="p-4 flex flex-col items-center">
                        <div id="pdf-preview-container"
                            class="w-full max-w-md mb-4 bg-gray-100 rounded-lg shadow-sm overflow-auto max-h-[300px] min-h-[200px] flex justify-center items-start">
                            <div id="pdf-preview" class="bg-gray-100 shadow-sm w-full max-w-full overflow-hidden">
                                <div
                                    class="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        class="h-4 w-4 mr-2" version="1.1" id="Capa_1" viewBox="0 0 370.32 370.32"
                                        xml:space="preserve">
                                        <g>
                                            <path style="fill:currentColor;"
                                                d="M320.816,63.219L261.94,4.339C259.156,1.561,255.391,0,251.457,0H74.272   C58.219,0,45.16,13.06,45.16,29.112v312.095c0,16.053,13.059,29.113,29.111,29.113h221.777c16.053,0,29.111-13.06,29.111-29.113   V73.703C325.16,69.769,323.6,65.997,320.816,63.219z M230.861,32.414v43.577c0,10.554,8.555,19.106,19.105,19.106h43.58v198.025   l-23.623-33.956c-5.554-7.983-14.589-12.832-24.312-13.046c-9.732-0.23-18.964,4.231-24.864,11.961l-15.667,20.525l-35.676-59.11   c-5.496-9.107-15.35-14.684-25.987-14.708c-0.023,0-0.046,0-0.069,0c-10.611,0-20.459,5.527-25.984,14.589l-40.591,66.564V32.414   H230.861z" />
                                            <circle style="fill:currentColor;" cx="203.953" cy="148.329" r="25" />
                                        </g>
                                    </svg>
                                    <p class="text-sm">Preview will appear after upload</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex space-x-2 mt-2">
                            <button id="zoom-out"
                                class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <button id="zoom-reset"
                                class="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                                disabled>100%</button>
                            <button id="zoom-in"
                                class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @push('script')
            <script src="{{ asset('js/imageToPdf.js') }}"></script>
        @endpush
    @endsection
    @section('main')
        @push('style')
            <style>
                .file-enter {
                    animation: enter 0.2s ease-out;
                }

                @keyframes enter {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        @endpush
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <header class="text-center mb-8">
                <h1 class="text-3xl font-bold text-blue-600 mb-2">PDF Merger Tool</h1>
                <p class="text-gray-600">Merge multiple PDF files into one document</p>
            </header>

            <!-- Main Card -->
            <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <!-- Upload Area -->
                <div id="upload-area"
                    class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 transition-all hover:border-blue-400">
                    <i class="fas fa-file-pdf text-4xl text-red-500 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-2">Upload PDF Files</h3>
                    <p class="text-gray-500 mb-4">Drag & drop your PDF files here or click to browse</p>
                    <input type="file" id="pdf-upload" class="hidden" accept=".pdf" multiple>
                    <button id="upload-btn"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Select Files
                    </button>
                    <p class="text-xs text-gray-400 mt-3">Files are processed in your browser - no server upload</p>
                </div>

                <!-- File List -->
                <div id="file-list-container" class="hidden mb-6">
                    <h3 class="text-lg font-medium mb-3">Files to Merge <span id="file-count"
                            class="text-sm text-gray-500"></span></h3>
                    <div id="file-list" class="space-y-2 max-h-96 overflow-y-auto">
                        <!-- Files will be added here dynamically -->
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row justify-end gap-3">
                    <button id="clear-btn"
                        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Clear All
                    </button>
                    <button id="merge-btn"
                        class="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
                        <span id="merge-text">Merge PDFs</span>
                        <span id="merge-spinner" class="hidden ml-2">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                    </button>
                    <button id="download-btn"
                        class="hidden px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                        <span>Download Merged PDF</span>
                        <i class="fas fa-download ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- Features Section -->
            <div class="max-w-3xl mx-auto mt-12">
                <h2 class="text-2xl font-bold text-center mb-6">Features</h2>
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <ul class="grid md:grid-cols-2 gap-4">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>Drag and drop PDF files</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>Rearrange files by dragging</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>100% client-side processing</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>No file size limits</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>Fast merging technology</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                            <span>No registration required</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <footer class="mt-12 text-center text-gray-500 text-sm">
                <p>© 2023 PDF Merger Tool. All rights reserved.</p>
                <p class="mt-1">Your files never leave your computer - completely private processing</p>
            </footer>
        </div>
        @push('script')
            <script src="{{ asset('js/mergePdf.js') }}"></script>
        @endpush
    @endsection
// Function to load external scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(); // Script already loaded
            return;
        }
        console.log('Loaded');
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Function to load all required scripts
async function loadRequiredScripts() {
    try {
        await Promise.all([
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'),
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js')
        ]);
        return true;
    } catch (error) {
        console.error('Error loading scripts:', error);
        alert('Failed to load required libraries. Please check your internet connection and try again.');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const uploadBtn = document.getElementById('upload-btn');
    const pdfUpload = document.getElementById('pdf-upload');
    const fileListContainer = document.getElementById('file-list-container');
    const fileList = document.getElementById('file-list');
    const clearBtn = document.getElementById('clear-btn');
    const mergeBtn = document.getElementById('merge-btn');
    const downloadBtn = document.getElementById('download-btn');
    const uploadArea = document.getElementById('upload-area');
    const fileCount = document.getElementById('file-count');
    const mergeText = document.getElementById('merge-text');
    const mergeSpinner = document.getElementById('merge-spinner');

    let files = [];
    let mergedPdfBlob = null;
    let scriptsLoaded = false;
    let sortableInitialized = false;

    // Function to initialize the application after scripts are loaded
    async function initializeApp() {
        if (scriptsLoaded) return true;
        const loaded = await loadRequiredScripts();
        if (!loaded) return false;
        scriptsLoaded = true;
        return true;
    }
    // PASTE handler
    document.addEventListener('paste', async function (e) {
        if (!await initializeApp()) return;
        e.preventDefault();

        const items = e.clipboardData.items;
        const pdfFiles = [];

        for (const item of items) {
            if (item.kind === 'file' && item.type === 'application/pdf') {
                const file = item.getAsFile();
                if (file) pdfFiles.push(file);
            }
        }

        if (pdfFiles.length === 1) {
            handleFiles(pdfFiles);
        } else if (pdfFiles.length > 1) {
            alert('Only one PDF can be pasted at a time. Use drag & drop or upload for multiple PDFs.');
        } else {
            alert('No valid PDF was pasted. Please press Ctrl+V after copying a PDF.');
        }
    });
    // Function to initialize Sortable (only after scripts are loaded)
    function initializeSortable() {
        if (sortableInitialized || !window.Sortable) return;
        new Sortable(fileList, {
            animation: 150,
            ghostClass: 'bg-blue-50',
            onEnd: function (evt) {
                // Update files array when order changes
                const newFiles = [];
                const items = fileList.querySelectorAll('.file-list-item');
                items.forEach(item => {
                    newFiles.push(files[parseInt(item.dataset.index)]);
                });
                files = newFiles;
                updateFileIndices();
            }
        });
        sortableInitialized = true;
    }

    // Handle file selection
    uploadBtn.addEventListener('click', async function () {
        if (!await initializeApp()) return;
        pdfUpload.click();
    });

    pdfUpload.addEventListener('change', async function (e) {
        if (!await initializeApp()) return;
        handleFiles(Array.from(e.target.files));
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', async function (e) {
        e.preventDefault();
        if (!await initializeApp()) return;
        uploadArea.classList.add('border-blue-400', 'bg-blue-50');
    });

    uploadArea.addEventListener('dragleave', function () {
        uploadArea.classList.remove('border-blue-400', 'bg-blue-50');
    });

    uploadArea.addEventListener('drop', async function (e) {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-400', 'bg-blue-50');
        if (!await initializeApp()) return;
        if (e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    });

    // Handle the selected files
    function handleFiles(newFiles) {
        // Filter only PDF files
        newFiles = newFiles.filter(file => file.type === 'application/pdf');

        if (newFiles.length === 0) {
            alert('Only PDF files are allowed.');
            return;
        }

        // Check for duplicates
        newFiles = newFiles.filter(newFile =>
            !files.some(existingFile =>
                existingFile.name === newFile.name &&
                existingFile.size === newFile.size &&
                existingFile.lastModified === newFile.lastModified
            )
        );

        files = [...files, ...newFiles];
        updateFileList();

        if (files.length > 0) {
            fileListContainer.classList.remove('hidden');
            initializeSortable(); // Initialize Sortable when files are added
            updateFileCount();
        }
    }

    // Update the file list UI
    function updateFileList() {
        fileList.innerHTML = '';

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className =
                'flex items-center justify-between bg-gray-50 p-3 rounded-lg file-list-item file-enter';
            fileItem.dataset.index = index;
            fileItem.draggable = true;
            fileItem.innerHTML = `
                        <div class="flex items-center flex-1 min-w-0">
                            <i class="fas fa-file-pdf text-red-500 mr-3"></i>
                            <div class="truncate">
                                <p class="text-sm font-medium truncate">${file.name}</p>
                                <p class="text-xs text-gray-500">${formatFileSize(file.size)}</p>
                            </div>
                        </div>
                        <button class="remove-btn p-1 text-gray-500 hover:text-red-600 ml-2" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    `;

            fileList.appendChild(fileItem);
        });

        if (files.length === 0) {
            fileListContainer.classList.add('hidden');
            downloadBtn.classList.add('hidden');
            mergeBtn.classList.remove('hidden');
        } else {
            mergeBtn.classList.remove('hidden');
        }
    }

    // Update file indices after sorting
    function updateFileIndices() {
        const items = fileList.querySelectorAll('.file-list-item');
        items.forEach((item, index) => {
            item.dataset.index = index;
        });
        updateFileCount();
    }

    // Update file count display
    function updateFileCount() {
        fileCount.textContent = `(${files.length} file${files.length !== 1 ? 's' : ''})`;
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Clear all files
    clearBtn.addEventListener('click', function () {
        files = [];
        mergedPdfBlob = null;
        updateFileList();
        pdfUpload.value = '';
        downloadBtn.classList.add('hidden');
        mergeBtn.classList.remove('hidden');
    });

    // Merge PDFs
    mergeBtn.addEventListener('click', async function () {
        if (!await initializeApp()) return;
        if (files.length === 0) {
            alert('Please upload at least one PDF file.');
            return;
        }

        try {
            // Show loading state
            mergeBtn.disabled = true;
            mergeText.textContent = 'Merging...';
            mergeSpinner.classList.remove('hidden');

            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    pages.forEach(page => mergedPdf.addPage(page));
                } catch (error) {
                    console.error(`Error processing file ${file.name}:`, error);
                    alert(
                        `Error processing "${file.name}". The file may be corrupted or protected.`);
                    return;
                }
            }

            // Save the merged PDF
            const mergedPdfBytes = await mergedPdf.save();
            mergedPdfBlob = new Blob([mergedPdfBytes], {
                type: 'application/pdf'
            });

            // Show download button
            mergeBtn.classList.add('hidden');
            downloadBtn.classList.remove('hidden');

        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('An error occurred while merging PDFs. Please try again.');
        } finally {
            // Reset UI
            mergeBtn.disabled = false;
            mergeText.textContent = 'Merge PDFs';
            mergeSpinner.classList.add('hidden');
        }
    });

    // Download merged PDF
    downloadBtn.addEventListener('click', function () {
        if (mergedPdfBlob && window.saveAs) {
            saveAs(mergedPdfBlob, 'merged-document.pdf');
        }
    });

    // Remove file when remove button is clicked
    fileList.addEventListener('click', function (e) {
        if (e.target.closest('.remove-btn')) {
            const fileItem = e.target.closest('.file-list-item');
            const index = parseInt(fileItem.dataset.index);

            files.splice(index, 1);
            updateFileList();
            updateFileIndices();

            // Hide download button if we're back to original state
            if (files.length === 0) {
                downloadBtn.classList.add('hidden');
                mergeBtn.classList.remove('hidden');
            }
        }
    });
});
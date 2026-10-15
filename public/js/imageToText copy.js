function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        console.log('Loaded');
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('dropZone');
    const imageUpload = document.getElementById('imageUpload');
    const filePreview = document.getElementById('filePreview');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const extractedText = document.getElementById('extractedText');
    const textPlaceholder = document.getElementById('textPlaceholder');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const extractBtn = document.getElementById('extractBtn');
    const clearImageBtn = document.getElementById('clearImageBtn');
    const clearTextBtn = document.getElementById('clearTextBtn');
    const status = document.getElementById('status');

    let currentFile = null;
    let processing = false;

    function init() {
        updateUI();
        setupEventListeners();
    }
    // Add paste event listener for clipboard images
    document.addEventListener('paste', (e) => {
        if (processing) return;
        const clipboardItems = e.clipboardData.items;
        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    // Create a new File object with a generic name since clipboard images don't have names
                    const namedFile = new File([file], `pasted-image.${file.type.split('/')[1]}`, { type: file.type });
                    handleFileSelection(namedFile);
                    updateStatus('Image pasted from clipboard.', 'info');
                    e.preventDefault();
                    return;
                }
            }
        }
        updateStatus('No image found in clipboard.', 'error');
        e.preventDefault();
    });
    function setupEventListeners() {
        dropZone.addEventListener('click', () => {
            if (!processing) imageUpload.click();
        });

        imageUpload.addEventListener('change', (e) => {
            if (e.target.files.length) handleFileSelection(e.target.files[0]);
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlightDropZone, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlightDropZone, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            if (file && (file.type.match('image.*') || file.type === 'application/pdf')) {
                handleFileSelection(file);
            } else {
                updateStatus('Unsupported file format. Please use PNG, JPG, JPEG, GIF, or PDF.',
                    'error');
            }
        });

        extractBtn.addEventListener('click', () => {
            if (currentFile && !processing) extractTextFromImage(currentFile);
        });

        copyBtn.addEventListener('click', copyToClipboard);
        downloadBtn.addEventListener('click', downloadText);
        clearImageBtn.addEventListener('click', resetImage);
        clearTextBtn.addEventListener('click', resetText);
    }

    function handleFileSelection(file) {
        if (!file.type.match('image.*') && file.type !== 'application/pdf') {
            updateStatus('Unsupported file format. Please use PNG, JPG, JPEG, GIF, or PDF.', 'error');
            return;
        }
        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviewContainer.classList.remove('hidden');
            dropZone.classList.add('hidden');
            updatePreview(file);
            updateStatus('File loaded. Ready to extract text.', 'info');
            updateUI();
        };
        reader.readAsDataURL(file);
    }

    function formatFileSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(2)} ${units[i]}`;
    }

    function updatePreview(file) {
        filePreview.innerHTML = '';
        const sizeText = formatFileSize(file.size);
        let content = '';

        if (file.type.match('image.*')) {
            const img = new Image();
            img.onload = () => {
                content = `
                            <img src="${URL.createObjectURL(file)}" alt="${file.name}" class="w-12 h-12 object-fit rounded-xl border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition">
                            <div class="flex-1">
                                <div class="font-medium text-gray-800">${file.name}</div>
                                <div class="text-gray-600 text-sm">${sizeText} px</div>
                            </div>
                            <div class="text-gray-400 hover:text-red-500 transition cursor-pointer" id="removePreviewBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </div>
                        `;
                filePreview.innerHTML = content;
                document.getElementById('removePreviewBtn').addEventListener('click', resetImage);
            };
            img.src = URL.createObjectURL(file);
        } else if (file.type === 'application/pdf') {
            content = `
                        <i class="fas fa-file-pdf text-red-500 text-3xl"></i>
                        <div class="flex-1">
                            <div class="font-medium text-gray-800">${file.name}</div>
                            <div class="text-gray-600 text-sm">${sizeText}</div>
                        </div>
                        <div class="text-gray-400 hover:text-red-500 transition cursor-pointer" id="removePreviewBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </div>
                    `;
            filePreview.innerHTML = content;
            document.getElementById('removePreviewBtn').addEventListener('click', resetImage);
        }
    }

    function preprocessImage(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                    data[i] = brightness;
                    data[i + 1] = brightness;
                    data[i + 2] = brightness;
                }

                const factor = 1.5;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, Math.max(0, (data[i] - 128) * factor + 128));
                    data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * factor + 128));
                    data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * factor + 128));
                }

                ctx.putImageData(imageData, 0, 0);
                ctx.filter = 'blur(1px)';
                ctx.drawImage(canvas, 0, 0);

                canvas.toBlob(callback, 'image/png');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async function extractTextFromImage(file) {
        processing = true;
        extractedText.value = '';
        textPlaceholder.classList.remove('hidden');
        updateUI();
        updateStatus('Processing file...', 'info');
        extractBtn.disabled = true;
        extractBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing...';
        // Lazy load Tesseract and PDF.js
        await loadScript('https://unpkg.com/tesseract.js@4/dist/tesseract.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');

        // Set PDF.js worker path if PDF
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        const processImage = async (blob) => {
            try {
                const {
                    data: {
                        text
                    }
                } = await Tesseract.recognize(
                    blob,
                    'eng', {
                    logger: m => updateStatus(
                        `${m.status.charAt(0).toUpperCase() + m.status.slice(1)}...`,
                        'info'),
                    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -,.!?:;()',
                    preserve_interword_spaces: true,
                    tessedit_pageseg_mode: 3,
                    oem: 1
                }
                );
                return text;
            } catch (err) {
                throw new Error('Error processing image: ' + err.message);
            }
        };

        try {
            if (file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const pdfData = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument({
                        data: pdfData
                    }).promise;
                    let fullText = '';

                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        updateStatus(`Processing page ${pageNum} of ${pdf.numPages}...`,
                            'info');
                        const page = await pdf.getPage(pageNum);
                        const viewport = page.getViewport({
                            scale: 2.0
                        });
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        await page.render({
                            canvasContext: ctx,
                            viewport: viewport
                        }).promise;

                        const blob = await new Promise(resolve => canvas.toBlob(resolve,
                            'image/png'));
                        const text = await processImage(blob);
                        fullText += `\n--- Page ${pageNum} ---\n${text}\n`;
                    }

                    if (!fullText.trim()) {
                        updateStatus('No text found in PDF. Use a clearer document.', 'error');
                    } else {
                        extractedText.value = fullText;
                        textPlaceholder.classList.add('hidden');
                        updateStatus('Text extracted successfully from PDF!', 'success');
                    }
                    processing = false;
                    updateUI();
                    extractBtn.disabled = false;
                    extractBtn.innerHTML = '<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6347 2.12433C15.9618 1.29189 17.1377 1.29189 17.4648 2.12433L17.8928 3.21354L18.9775 3.6429C19.8068 3.97121 19.8068 5.14713 18.9775 5.47544L17.8928 5.90481L17.4648 6.99401C17.1377 7.82645 15.9618 7.82646 15.6347 6.99402L15.2067 5.90481L14.122 5.47544C13.2927 5.14714 13.2927 3.97121 14.122 3.6429L15.2067 3.21354L15.6347 2.12433ZM16.5497 2.52989L16.9645 3.58533C17.0641 3.83891 17.2644 4.04027 17.5181 4.14073L18.5752 4.55917L17.5181 4.97762C17.2644 5.07808 17.0641 5.27943 16.9645 5.53301L16.5497 6.58845L16.135 5.53301C16.0354 5.27943 15.8351 5.07808 15.5813 4.97762L14.5243 4.55917L15.5813 4.14073C15.8351 4.04027 16.0354 3.83891 16.135 3.58533L16.5497 2.52989Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.3142 3.3142C4.73313 1.89527 7.03366 1.89527 8.45259 3.3142L20.6858 15.5474C22.1047 16.9663 22.1047 19.2669 20.6858 20.6858C19.2669 22.1047 16.9663 22.1047 15.5474 20.6858L3.3142 8.45259C1.89527 7.03366 1.89527 4.73313 3.3142 3.3142ZM7.39193 4.37486C6.55879 3.54171 5.208 3.54171 4.37486 4.37486C3.54171 5.208 3.54171 6.55879 4.37486 7.39193L5.96114 8.97821L8.97821 5.96114L7.39193 4.37486ZM16.6081 19.6251L7.0218 10.0389L10.0389 7.0218L19.6251 16.6081C20.4583 17.4412 20.4583 18.792 19.6251 19.6251C18.792 20.4583 17.4412 20.4583 16.6081 19.6251Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.332 8.94659C21.0049 8.11416 19.8289 8.11416 19.5018 8.94659L19.3473 9.33987L18.956 9.49475C18.1266 9.82306 18.1266 10.999 18.956 11.3273L19.3473 11.4822L19.5018 11.8755C19.8289 12.7079 21.0049 12.7079 21.332 11.8755L21.4865 11.4822L21.8778 11.3273C22.7071 10.999 22.7071 9.82306 21.8778 9.49475L21.4865 9.33987L21.332 8.94659ZM20.4169 9.35216L20.2756 9.71166C20.176 9.96524 19.9757 10.1666 19.7219 10.2671L19.3583 10.411L19.7219 10.555C19.9757 10.6555 20.176 10.8568 20.2756 11.1104L20.4169 11.4699L20.5582 11.1104C20.6578 10.8568 20.858 10.6555 21.1118 10.555L21.4755 10.411L21.1118 10.2671C20.858 10.1666 20.6578 9.96524 20.5582 9.71166L20.4169 9.35216Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.66784 15.1243C4.99493 14.2919 6.17088 14.2919 6.49797 15.1243L6.65251 15.5176L7.04379 15.6725C7.87315 16.0008 7.87315 17.1767 7.04378 17.505L6.65251 17.6599L6.49797 18.0532C6.17088 18.8856 4.99493 18.8856 4.66784 18.0532L4.5133 17.6599L4.12203 17.505C3.29266 17.1767 3.29266 16.0008 4.12202 15.6725L4.5133 15.5176L4.66784 15.1243ZM5.44164 15.8894L5.5829 15.5299L5.72417 15.8894C5.82381 16.143 6.02407 16.3443 6.27785 16.4448L6.64154 16.5888L6.27785 16.7327C6.02407 16.8332 5.82381 17.0345 5.72417 17.2881L5.5829 17.6476L5.44164 17.2881C5.342 17.0345 5.14174 16.8332 4.88796 16.7327L4.52427 16.5888L4.88796 16.4448C5.14174 16.3443 5.342 16.143 5.44164 15.8894Z" fill="currentColor"></path></g></svg>Extract Text';
                };
                reader.readAsArrayBuffer(file);
            } else {
                preprocessImage(file, async (blob) => {
                    try {
                        const text = await processImage(blob);
                        if (!text.trim()) {
                            updateStatus(
                                'No text found. Use a clearer image with better contrast.',
                                'error');
                        } else {
                            extractedText.value = text;
                            textPlaceholder.classList.add('hidden');
                            updateStatus('Text extracted successfully!', 'success');
                        }
                    } catch (err) {
                        updateStatus(err.message, 'error');
                    }
                    processing = false;
                    updateUI();
                    extractBtn.disabled = false;
                    extractBtn.innerHTML = '<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6347 2.12433C15.9618 1.29189 17.1377 1.29189 17.4648 2.12433L17.8928 3.21354L18.9775 3.6429C19.8068 3.97121 19.8068 5.14713 18.9775 5.47544L17.8928 5.90481L17.4648 6.99401C17.1377 7.82645 15.9618 7.82646 15.6347 6.99402L15.2067 5.90481L14.122 5.47544C13.2927 5.14714 13.2927 3.97121 14.122 3.6429L15.2067 3.21354L15.6347 2.12433ZM16.5497 2.52989L16.9645 3.58533C17.0641 3.83891 17.2644 4.04027 17.5181 4.14073L18.5752 4.55917L17.5181 4.97762C17.2644 5.07808 17.0641 5.27943 16.9645 5.53301L16.5497 6.58845L16.135 5.53301C16.0354 5.27943 15.8351 5.07808 15.5813 4.97762L14.5243 4.55917L15.5813 4.14073C15.8351 4.04027 16.0354 3.83891 16.135 3.58533L16.5497 2.52989Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.3142 3.3142C4.73313 1.89527 7.03366 1.89527 8.45259 3.3142L20.6858 15.5474C22.1047 16.9663 22.1047 19.2669 20.6858 20.6858C19.2669 22.1047 16.9663 22.1047 15.5474 20.6858L3.3142 8.45259C1.89527 7.03366 1.89527 4.73313 3.3142 3.3142ZM7.39193 4.37486C6.55879 3.54171 5.208 3.54171 4.37486 4.37486C3.54171 5.208 3.54171 6.55879 4.37486 7.39193L5.96114 8.97821L8.97821 5.96114L7.39193 4.37486ZM16.6081 19.6251L7.0218 10.0389L10.0389 7.0218L19.6251 16.6081C20.4583 17.4412 20.4583 18.792 19.6251 19.6251C18.792 20.4583 17.4412 20.4583 16.6081 19.6251Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.332 8.94659C21.0049 8.11416 19.8289 8.11416 19.5018 8.94659L19.3473 9.33987L18.956 9.49475C18.1266 9.82306 18.1266 10.999 18.956 11.3273L19.3473 11.4822L19.5018 11.8755C19.8289 12.7079 21.0049 12.7079 21.332 11.8755L21.4865 11.4822L21.8778 11.3273C22.7071 10.999 22.7071 9.82306 21.8778 9.49475L21.4865 9.33987L21.332 8.94659ZM20.4169 9.35216L20.2756 9.71166C20.176 9.96524 19.9757 10.1666 19.7219 10.2671L19.3583 10.411L19.7219 10.555C19.9757 10.6555 20.176 10.8568 20.2756 11.1104L20.4169 11.4699L20.5582 11.1104C20.6578 10.8568 20.858 10.6555 21.1118 10.555L21.4755 10.411L21.1118 10.2671C20.858 10.1666 20.6578 9.96524 20.5582 9.71166L20.4169 9.35216Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.66784 15.1243C4.99493 14.2919 6.17088 14.2919 6.49797 15.1243L6.65251 15.5176L7.04379 15.6725C7.87315 16.0008 7.87315 17.1767 7.04378 17.505L6.65251 17.6599L6.49797 18.0532C6.17088 18.8856 4.99493 18.8856 4.66784 18.0532L4.5133 17.6599L4.12203 17.505C3.29266 17.1767 3.29266 16.0008 4.12202 15.6725L4.5133 15.5176L4.66784 15.1243ZM5.44164 15.8894L5.5829 15.5299L5.72417 15.8894C5.82381 16.143 6.02407 16.3443 6.27785 16.4448L6.64154 16.5888L6.27785 16.7327C6.02407 16.8332 5.82381 17.0345 5.72417 17.2881L5.5829 17.6476L5.44164 17.2881C5.342 17.0345 5.14174 16.8332 4.88796 16.7327L4.52427 16.5888L4.88796 16.4448C5.14174 16.3443 5.342 16.143 5.44164 15.8894Z" fill="currentColor"></path></g></svg>Extract Text';
                });
            }
        } catch (err) {
            console.error(err);
            updateStatus('Error processing file. Please try a clearer image or PDF.', 'error');
            processing = false;
            updateUI();
            extractBtn.disabled = false;
            extractBtn.innerHTML = '<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.6347 2.12433C15.9618 1.29189 17.1377 1.29189 17.4648 2.12433L17.8928 3.21354L18.9775 3.6429C19.8068 3.97121 19.8068 5.14713 18.9775 5.47544L17.8928 5.90481L17.4648 6.99401C17.1377 7.82645 15.9618 7.82646 15.6347 6.99402L15.2067 5.90481L14.122 5.47544C13.2927 5.14714 13.2927 3.97121 14.122 3.6429L15.2067 3.21354L15.6347 2.12433ZM16.5497 2.52989L16.9645 3.58533C17.0641 3.83891 17.2644 4.04027 17.5181 4.14073L18.5752 4.55917L17.5181 4.97762C17.2644 5.07808 17.0641 5.27943 16.9645 5.53301L16.5497 6.58845L16.135 5.53301C16.0354 5.27943 15.8351 5.07808 15.5813 4.97762L14.5243 4.55917L15.5813 4.14073C15.8351 4.04027 16.0354 3.83891 16.135 3.58533L16.5497 2.52989Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.3142 3.3142C4.73313 1.89527 7.03366 1.89527 8.45259 3.3142L20.6858 15.5474C22.1047 16.9663 22.1047 19.2669 20.6858 20.6858C19.2669 22.1047 16.9663 22.1047 15.5474 20.6858L3.3142 8.45259C1.89527 7.03366 1.89527 4.73313 3.3142 3.3142ZM7.39193 4.37486C6.55879 3.54171 5.208 3.54171 4.37486 4.37486C3.54171 5.208 3.54171 6.55879 4.37486 7.39193L5.96114 8.97821L8.97821 5.96114L7.39193 4.37486ZM16.6081 19.6251L7.0218 10.0389L10.0389 7.0218L19.6251 16.6081C20.4583 17.4412 20.4583 18.792 19.6251 19.6251C18.792 20.4583 17.4412 20.4583 16.6081 19.6251Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.332 8.94659C21.0049 8.11416 19.8289 8.11416 19.5018 8.94659L19.3473 9.33987L18.956 9.49475C18.1266 9.82306 18.1266 10.999 18.956 11.3273L19.3473 11.4822L19.5018 11.8755C19.8289 12.7079 21.0049 12.7079 21.332 11.8755L21.4865 11.4822L21.8778 11.3273C22.7071 10.999 22.7071 9.82306 21.8778 9.49475L21.4865 9.33987L21.332 8.94659ZM20.4169 9.35216L20.2756 9.71166C20.176 9.96524 19.9757 10.1666 19.7219 10.2671L19.3583 10.411L19.7219 10.555C19.9757 10.6555 20.176 10.8568 20.2756 11.1104L20.4169 11.4699L20.5582 11.1104C20.6578 10.8568 20.858 10.6555 21.1118 10.555L21.4755 10.411L21.1118 10.2671C20.858 10.1666 20.6578 9.96524 20.5582 9.71166L20.4169 9.35216Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.66784 15.1243C4.99493 14.2919 6.17088 14.2919 6.49797 15.1243L6.65251 15.5176L7.04379 15.6725C7.87315 16.0008 7.87315 17.1767 7.04378 17.505L6.65251 17.6599L6.49797 18.0532C6.17088 18.8856 4.99493 18.8856 4.66784 18.0532L4.5133 17.6599L4.12203 17.505C3.29266 17.1767 3.29266 16.0008 4.12202 15.6725L4.5133 15.5176L4.66784 15.1243ZM5.44164 15.8894L5.5829 15.5299L5.72417 15.8894C5.82381 16.143 6.02407 16.3443 6.27785 16.4448L6.64154 16.5888L6.27785 16.7327C6.02407 16.8332 5.82381 17.0345 5.72417 17.2881L5.5829 17.6476L5.44164 17.2881C5.342 17.0345 5.14174 16.8332 4.88796 16.7327L4.52427 16.5888L4.88796 16.4448C5.14174 16.3443 5.342 16.143 5.44164 15.8894Z" fill="currentColor"></path></g></svg>Extract Text';
        }
    }

    function copyToClipboard() {
        if (!extractedText.value) return;
        extractedText.select();
        document.execCommand('copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg class="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor"></path> </g></svg>Copied';
        copyBtn.classList.remove('bg-white', 'text-gray-700');
        copyBtn.classList.add('bg-green-50', 'text-green-600');
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.add('bg-white', 'text-gray-700');
            copyBtn.classList.remove('bg-green-50', 'text-green-600');
        }, 2000);
    }

    function downloadText() {
        if (!extractedText.value) return;
        const blob = new Blob([extractedText.value], {
            type: 'text/plain'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'extracted-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<svg class="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor"></path> </g></svg>Downloaded';
        downloadBtn.classList.remove('bg-white', 'text-gray-700');
        downloadBtn.classList.add('bg-green-50', 'text-green-600');
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.classList.add('bg-white', 'text-gray-700');
            downloadBtn.classList.remove('bg-green-50', 'text-green-600');
        }, 2000);
    }

    function resetImage() {
        currentFile = null;
        filePreview.innerHTML = '';
        imagePreviewContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
        imageUpload.value = '';
        updateStatus('Ready for upload', 'info');
        updateUI();
    }

    function resetText() {
        extractedText.value = '';
        textPlaceholder.classList.remove('hidden');
        updateUI();
    }

    function updateUI() {
        copyBtn.disabled = !extractedText.value;
        downloadBtn.disabled = !extractedText.value;
        clearTextBtn.classList.toggle('hidden', !extractedText.value);
        extractBtn.disabled = processing || !currentFile;
    }

function updateStatus(message, type = 'info') {
    const statusIcon = status.querySelector('.status-icon'); // Select SVG by class
    if (!statusIcon) {
        console.error('Status icon not found in status container');
        return;
    }
    statusIcon.classList.remove('text-blue-500', 'text-green-500', 'text-red-500', 'text-gray-500');
    switch (type) {
        case 'success':
            statusIcon.classList.add('text-green-500');
            break;
        case 'error':
            statusIcon.classList.add('text-red-500');
            break;
        case 'info':
        default:
            statusIcon.classList.add('text-gray-500');
    }
    status.querySelector('span').textContent = message;
}
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlightDropZone() {
        dropZone.classList.add('border-indigo-400', 'bg-indigo-50/30');
    }

    function unhighlightDropZone() {
        dropZone.classList.remove('border-indigo-400', 'bg-indigo-50/30');
    }

    init();
});
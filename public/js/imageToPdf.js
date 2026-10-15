function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(); // Already loaded
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

document.addEventListener("DOMContentLoaded", function () {
    let images = [];
    let currentFitMode = "contain";
    let currentZoom = 0.8;
    let draggedItem = null;
    let placeholder = null;
    let isJsPDFLoaded = false; // Flag to track if jsPDF is loaded

    // DOM elements with null checks
    const elements = {
        fileUpload: document.getElementById("file-upload"),
        dropZone: document.getElementById("drop-zone"),
        imageList: document.getElementById("image-list"),
        pdfPreview: document.getElementById("pdf-preview"),
        pdfPreviewContainer: document.getElementById("pdf-preview-container"),
        previewScale: document.getElementById("preview-scale"),
        pageCount: document.getElementById("page-count"),
        fileCounter: document.getElementById("file-counter"),
        imageCount: document.getElementById("image-count"),
        totalSize: document.getElementById("total-size"),
        clearAllBtn: document.getElementById("clear-all"),
        generatePdfBtn: document.getElementById("generate-pdf"),
        pageSize: document.getElementById("page-size"),
        orientationPortrait: document.getElementById("orientation-portrait"),
        orientationLandscape: document.getElementById("orientation-landscape"),
        marginNone: document.getElementById("margin-none"),
        marginSmall: document.getElementById("margin-small"),
        fitContain: document.getElementById("fit-contain"),
        fitCover: document.getElementById("fit-cover"),
        fitActual: document.getElementById("fit-actual"),
        zoomIn: document.getElementById("zoom-in"),
        zoomOut: document.getElementById("zoom-out"),
        zoomReset: document.getElementById("zoom-reset")
    };

    // Check for missing elements and log errors
    const missingElements = Object.entries(elements)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
    if (missingElements.length > 0) {
        console.error("Missing DOM elements:", missingElements);
        alert("Error: Some required elements are missing. Please check the console for details.");
        return; // Stop execution if critical elements are missing
    }

    // Destructure elements for easier access
    const {
        fileUpload, dropZone, imageList, pdfPreview, pdfPreviewContainer,
        previewScale, pageCount, fileCounter, imageCount, totalSize,
        clearAllBtn, generatePdfBtn, pageSize, orientationPortrait,
        orientationLandscape, marginNone, marginSmall, fitContain,
        fitCover, fitActual, zoomIn, zoomOut, zoomReset
    } = elements;

    // Page size dimensions (in mm)
    const pageSizes = {
        a4: { width: 210, height: 297 },
        letter: { width: 216, height: 279 },
        legal: { width: 216, height: 356 },
        a5: { width: 148, height: 210 },
    };

    // Handle drag and drop for file upload
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropZone.classList.add("border-blue-500", "bg-blue-50");
    }

    function unhighlight() {
        dropZone.classList.remove("border-blue-500", "bg-blue-50");
    }

    dropZone.addEventListener("drop", handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle click to trigger file input
    dropZone.addEventListener("click", function () {
        fileUpload.click();
    });

    // Handle file upload
    fileUpload.addEventListener("change", function (e) {
        handleFiles(e.target.files);
        fileUpload.value = "";
    });

    async function handleFiles(files) {
        if (!files.length) return;

        const maxFileSize = 5 * 1024 * 1024; // 5MB
        const validFiles = Array.from(files).filter((file) => {
            if (!file.type.match("image.*")) {
                alert(`File ${file.name} is not an image`);
                return false;
            }
            if (file.size > maxFileSize) {
                alert(`File ${file.name} is too large (max 5MB)`);
                return false;
            }
            return true;
        });

        const imagePromises = validFiles.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.onload = function () {
                        resolve({
                            id: Date.now() + Math.random().toString(36).substr(2, 9),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified,
                            dataUrl: e.target.result,
                            width: img.width,
                            height: img.height,
                        });
                    };
                    img.onerror = function () {
                        alert(`Failed to load image: ${file.name}`);
                        reject(new Error(`Failed to load image: ${file.name}`));
                    };
                    img.src = e.target.result;
                };
                reader.onerror = function () {
                    alert(`Failed to read file: ${file.name}`);
                    reject(new Error(`Failed to read file: ${file.name}`));
                };
                reader.readAsDataURL(file);
            });
        });

        try {
            const newImages = await Promise.all(imagePromises);
            images.push(...newImages);
            updateImageList();
            updatePdfPreview();
            updateFileCounters();
            toggleUIState();
        } catch (error) {
            console.error(error);
        }
    }

    // Update file counters
    function updateFileCounters() {
        const totalBytes = images.reduce((sum, img) => sum + img.size, 0);
        fileCounter.textContent = `${images.length} file${images.length === 1 ? "" : "s"} selected`;
        imageCount.textContent = `${images.length} image${images.length === 1 ? "" : "s"}`;
        totalSize.textContent = formatBytes(totalBytes);
    }

    function formatBytes(bytes) {
        const sizes = ['KB', 'MB', 'GB', 'TB'];
        if (bytes < 1024) return '0 KB';
        const i = Math.floor(Math.log(bytes) / Math.log(1024)) - 1;
        const value = bytes / Math.pow(1024, i + 1);
        return `${value.toFixed(2)} ${sizes[i]}`;
    }

    // Toggle UI state based on whether we have images
    function toggleUIState() {
        const hasImages = images.length > 0;
        clearAllBtn.disabled = !hasImages;
        generatePdfBtn.disabled = !hasImages;
        zoomIn.disabled = !hasImages;
        zoomOut.disabled = !hasImages;
        zoomReset.disabled = !hasImages;
    }

    // Update image list display
    function updateImageList() {
        imageList.innerHTML = "";
        if (images.length === 0) {
            imageList.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p class="text-sm">Upload images to get started</p>
                    </div>
                `;
            return;
        }

        images.forEach((image, index) => {
            const imageItem = document.createElement("div");
            imageItem.className =
                "flex items-center p-3 mb-2 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition cursor-move";
            imageItem.draggable = true;
            imageItem.dataset.id = image.id;

            imageItem.innerHTML = `
                    <div class="drag-handle flex-shrink-0 p-1 text-gray-400 hover:text-blue-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>
                    </div>
                    <div class="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition">
                        <img src="${image.dataUrl}" class="w-full h-full object-cover" alt="Thumbnail">
                    </div>
                    <div class="ml-3 flex-grow min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">${image.name}</p>
                        <div class="flex items-center text-xs text-gray-500">
                            <span>${formatBytes(image.size)}</span>
                            <span class="mx-2">•</span>
                            <span>${image.width} × ${image.height} px</span>
                        </div>
                    </div>
                    <button class="cursor-pointer ml-3 p-1.5 text-gray-400 hover:text-red-500 transition delete-image" data-id="${image.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                `;

            imageList.appendChild(imageItem);
        });

        document.querySelectorAll(".delete-image").forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                const id = this.dataset.id;
                images = images.filter((img) => img.id !== id);
                updateImageList();
                updatePdfPreview();
                updateFileCounters();
                toggleUIState();
            });
        });

        setupDragAndDrop();
    }

    // Drag and drop sorting
    function setupDragAndDrop() {
        const listItems = imageList.querySelectorAll("[data-id]");
        listItems.forEach((item) => {
            item.addEventListener("dragstart", handleDragStart);
            item.addEventListener("dragend", handleDragEnd);
        });
        imageList.addEventListener("dragover", handleDragOver);
        imageList.addEventListener("drop", handleDropItem);
        imageList.addEventListener("dragleave", handleDragLeave);
    }

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add("opacity-50", "bg-blue-50");
        e.dataTransfer.setData("text/plain", this.dataset.id);
        e.dataTransfer.effectAllowed = "move";
        console.log(`Drag started: ${this.dataset.id}`);
    }

    function handleDragEnd() {
        this.classList.remove("opacity-50", "bg-blue-50");
        removePlaceholder();
        draggedItem = null;
        console.log("Drag ended");
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (!draggedItem) return;

        const allItems = Array.from(imageList.querySelectorAll("[data-id]"));
        let insertBeforeElement = null;

        for (const item of allItems) {
            if (item === draggedItem) continue;
            const rect = item.getBoundingClientRect();
            const isUpperHalf = e.clientY < rect.top + rect.height / 2;
            if (isUpperHalf) {
                insertBeforeElement = item;
                break;
            }
        }

        removePlaceholder();
        placeholder = document.createElement("div");
        placeholder.className = "drag-placeholder";
        if (insertBeforeElement) {
            imageList.insertBefore(placeholder, insertBeforeElement);
        } else {
            imageList.appendChild(placeholder);
        }
    }

    function handleDragLeave(e) {
        if (e.currentTarget === imageList) {
            removePlaceholder();
            console.log("Drag left image list");
        }
    }

    function handleDropItem(e) {
        e.preventDefault();
        if (!draggedItem) {
            removePlaceholder();
            return;
        }

        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedIndex = images.findIndex(img => img.id === draggedId);
        if (draggedIndex === -1) {
            removePlaceholder();
            return;
        }

        const allChildren = Array.from(imageList.children);
        const dropIndex = allChildren.indexOf(placeholder);
        const draggedImage = images.splice(draggedIndex, 1)[0];
        const adjustedDropIndex = dropIndex > draggedIndex ? dropIndex - 1 : dropIndex;
        images.splice(adjustedDropIndex, 0, draggedImage);

        removePlaceholder();
        updateImageList();
        updatePdfPreview();
    }

    function removePlaceholder() {
        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
            placeholder = null;
            console.log("Placeholder removed");
        }
    }

    // Update PDF preview with accurate dimensions and margins
    function updatePdfPreview() {
        if (!images.length) {
            pdfPreview.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p class="text-sm">Preview will appear after upload</p>
                    </div>
                `;
            pageCount.textContent = "0 pages";
            pdfPreviewContainer.style.width = "100%";
            pdfPreview.style.height = "200px";
            return;
        }

        const selectedSize = pageSize.value;
        const isLandscape = orientationLandscape.checked;
        const marginValue = marginSmall.checked ? parseInt(marginSmall.value) : parseInt(marginNone.value);
        const margins = {
            top: marginValue,
            bottom: marginValue,
            left: marginValue,
            right: marginValue,
        };

        let pageWidth = pageSizes[selectedSize].width;
        let pageHeight = pageSizes[selectedSize].height;
        if (isLandscape) {
            [pageWidth, pageHeight] = [pageHeight, pageWidth];
        }

        const contentWidth = pageWidth - margins.left - margins.right;
        const contentHeight = pageHeight - margins.top - margins.bottom;

        const mmToPx = 96 / 25.4; // Convert mm to pixels (assuming 96 DPI)
        const maxContainerWidth = 500;
        const maxContainerHeight = 600;
        const widthScale = maxContainerWidth / (pageWidth * mmToPx);
        const heightScale = maxContainerHeight / (pageHeight * mmToPx);
        const scale = Math.min(widthScale, heightScale, 1);
        const previewWidth = pageWidth * mmToPx * scale * currentZoom;
        const previewHeight = pageHeight * mmToPx * scale * currentZoom;

        pdfPreviewContainer.style.width = `${previewWidth}px`;
        pdfPreviewContainer.style.maxHeight = `${maxContainerHeight}px`;
        previewScale.textContent = `${Math.round(currentZoom * 100)}%`;
        pageCount.textContent = `${images.length} page${images.length !== 1 ? "s" : ""}`;

        pdfPreview.innerHTML = "";
        pdfPreview.style.width = `${previewWidth}px`;
        pdfPreview.style.height = `${images.length * previewHeight}px`;
        pdfPreview.style.position = "relative";
        pdfPreview.style.backgroundColor = "#f3f4f6";

        images.forEach((image, index) => {
            const pageContent = document.createElement("div");
            pageContent.className = "relative bg-white shadow-sm overflow-hidden w-full";
            pageContent.style.width = `${previewWidth}px`;
            pageContent.style.height = `${previewHeight}px`;
            pageContent.style.position = "absolute";
            pageContent.style.top = `${index * previewHeight}px`;
            pageContent.style.marginBottom = `${10 * scale * currentZoom}px`;

            const imgContainer = document.createElement("div");
            imgContainer.className = "flex justify-center items-center overflow-hidden bg-white";
            imgContainer.style.width = `${contentWidth * mmToPx * scale * currentZoom}px`;
            imgContainer.style.height = `${contentHeight * mmToPx * scale * currentZoom}px`;
            imgContainer.style.margin = `${margins.top * mmToPx * scale * currentZoom}px ${margins.right * mmToPx * scale * currentZoom}px ${margins.bottom * mmToPx * scale * currentZoom}px ${margins.left * mmToPx * scale * currentZoom}px`;

            const imgElement = document.createElement("img");
            imgElement.src = image.dataUrl;
            imgElement.alt = image.name;
            imgElement.className = "max-w-full max-h-full block mx-auto";

            let imgWidth, imgHeight;
            const imgRatio = image.width / image.height;
            const contentRatio = contentWidth / contentHeight;

            if (currentFitMode === "contain") {
                if (imgRatio > contentRatio) {
                    imgWidth = contentWidth * mmToPx * scale * currentZoom;
                    imgHeight = imgWidth / imgRatio;
                } else {
                    imgHeight = contentHeight * mmToPx * scale * currentZoom;
                    imgWidth = imgHeight * imgRatio;
                }
            } else if (currentFitMode === "cover") {
                if (imgRatio > contentRatio) {
                    imgHeight = contentHeight * mmToPx * scale * currentZoom;
                    imgWidth = imgHeight * imgRatio;
                } else {
                    imgWidth = contentWidth * mmToPx * scale * currentZoom;
                    imgHeight = imgWidth / imgRatio;
                }
            } else {
                const pxToMm = 25.4 / 96;
                imgWidth = image.width * pxToMm * mmToPx * scale * currentZoom;
                imgHeight = image.height * pxToMm * mmToPx * scale * currentZoom;
                if (imgWidth > contentWidth * mmToPx * scale * currentZoom || imgHeight > contentHeight * mmToPx * scale * currentZoom) {
                    const imgScale = Math.min(
                        (contentWidth * mmToPx * scale * currentZoom) / imgWidth,
                        (contentHeight * mmToPx * scale * currentZoom) / imgHeight
                    );
                    imgWidth *= imgScale;
                    imgHeight *= imgScale;
                }
            }

            imgElement.style.width = `${imgWidth}px`;
            imgElement.style.height = `${imgHeight}px`;
            imgElement.style.objectFit = currentFitMode === "cover" ? "cover" : "contain";

            imgContainer.appendChild(imgElement);
            pageContent.appendChild(imgContainer);
            pdfPreview.appendChild(pageContent);
        });
    }

    // Fit mode functions
    function setFitMode(mode) {
        currentFitMode = mode;
        updatePdfPreview();
        updateActiveFitButtons();
    }

    function updateActiveFitButtons() {
        [fitContain, fitCover, fitActual].forEach((btn) => {
            btn.classList.remove("bg-blue-100", "text-blue-800");
            btn.classList.add("bg-gray-100", "text-gray-800");
        });

        let activeButton;
        switch (currentFitMode) {
            case "contain":
                activeButton = fitContain;
                break;
            case "cover":
                activeButton = fitCover;
                break;
            case "actual":
                activeButton = fitActual;
                break;
        }

        if (activeButton) {
            activeButton.classList.remove("bg-gray-100", "text-gray-800");
            activeButton.classList.add("bg-blue-100", "text-blue-800");
        }
    }

    // Zoom functions
    function handleZoomIn() {
        if (currentZoom < 2) {
            currentZoom += 0.1;
            updatePdfPreview();
        }
    }

    function handleZoomOut() {
        if (currentZoom > 0.3) {
            currentZoom -= 0.1;
            updatePdfPreview();
        }
    }

    function handleZoomReset() {
        currentZoom = 0.8;
        updatePdfPreview();
    }

    // Generate PDF
    async function generatePDF() {
        if (images.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        // Show loading
        const icon = document.getElementById("generate-icon");
        const loading = document.getElementById("generate-loading");
        icon.classList.add("hidden");
        loading.classList.remove("hidden");
        generatePdfBtn.disabled = true;

        try {
            // Load jsPDF if not already loaded
            if (!isJsPDFLoaded) {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
                isJsPDFLoaded = true;
            }

            // Access jsPDF
            const { jsPDF } = window.jspdf;

            const selectedSize = pageSize.value;
            const isLandscape = orientationLandscape.checked;
            const marginValue = marginSmall.checked ? parseInt(marginSmall.value) : parseInt(marginNone.value);
            const margins = {
                top: marginValue,
                bottom: marginValue,
                left: marginValue,
                right: marginValue,
            };

            const pdf = new jsPDF({
                orientation: isLandscape ? "landscape" : "portrait",
                unit: "mm",
                format: selectedSize,
            });

            images.forEach((image, index) => {
                if (index > 0) {
                    pdf.addPage(selectedSize, isLandscape ? "landscape" : "portrait");
                }

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const contentWidth = pageWidth - margins.left - margins.right;
                const contentHeight = pageHeight - margins.top - margins.bottom;

                let imgWidth, imgHeight;
                const imgRatio = image.width / image.height;
                const contentRatio = contentWidth / contentHeight;

                if (currentFitMode === "contain") {
                    if (imgRatio > contentRatio) {
                        imgWidth = contentWidth;
                        imgHeight = contentWidth / imgRatio;
                    } else {
                        imgHeight = contentHeight;
                        imgWidth = contentHeight * imgRatio;
                    }
                } else if (currentFitMode === "cover") {
                    if (imgRatio > contentRatio) {
                        imgHeight = contentHeight;
                        imgWidth = imgHeight * imgRatio;
                    } else {
                        imgWidth = contentWidth;
                        imgHeight = imgWidth / imgRatio;
                    }
                } else {
                    const pxToMm = 25.4 / 96;
                    imgWidth = image.width * pxToMm;
                    imgHeight = image.height * pxToMm;
                    if (imgWidth > contentWidth || imgHeight > contentHeight) {
                        const scale = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
                        imgWidth *= scale;
                        imgHeight *= scale;
                    }
                }

                const x = margins.left + (contentWidth - imgWidth) / 2;
                const y = margins.top + (contentHeight - imgHeight) / 2;

                pdf.addImage(image.dataUrl, "JPEG", x, y, imgWidth, imgHeight);
            });

            pdf.save("images.pdf");
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            // Hide loading
            icon.classList.remove("hidden");
            loading.classList.add("hidden");
            generatePdfBtn.disabled = false;
        }
    }

    // Event listeners for settings changes
    pageSize.addEventListener("change", updatePdfPreview);
    orientationPortrait.addEventListener("change", updatePdfPreview);
    orientationLandscape.addEventListener("change", updatePdfPreview);
    marginNone.addEventListener("change", updatePdfPreview);
    marginSmall.addEventListener("change", updatePdfPreview);

    // Event listeners for fit mode buttons
    fitContain.addEventListener("click", () => setFitMode("contain"));
    fitCover.addEventListener("click", () => setFitMode("cover"));
    fitActual.addEventListener("click", () => setFitMode("actual"));

    // Event listeners for zoom buttons
    zoomIn.addEventListener("click", handleZoomIn);
    zoomOut.addEventListener("click", handleZoomOut);
    zoomReset.addEventListener("click", handleZoomReset);

    // Event listeners for action buttons
    clearAllBtn.addEventListener("click", function () {
        images = [];
        pageSize.value = "a4";
        orientationPortrait.checked = true;
        marginNone.checked = true;
        setFitMode("contain");
        handleZoomReset();
        updateImageList();
        updatePdfPreview();
        updateFileCounters();
        toggleUIState();
    });

    generatePdfBtn.addEventListener("click", generatePDF);

    // Initialize with default fit mode
    setFitMode("contain");
    document.addEventListener('paste', async function (e) {
    const clipboardItems = e.clipboardData.items;
    const imageFiles = [];

    for (const item of clipboardItems) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
                imageFiles.push(file);
            }
        }
    }

    if (imageFiles.length > 0) {
        await handleFiles(imageFiles);
    } else {
        alert("No image found in clipboard. Please copy and paste an image.");
    }
});

});
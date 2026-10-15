function toggleButtonState( inputId, minifyBtnId, clearBtnId ) {
  const input = document.getElementById( inputId ).value;
  const minifyBtn = document.getElementById( minifyBtnId );
  const clearBtn = document.getElementById( clearBtnId );
  const isDisabled = !input.trim();
  minifyBtn.disabled = isDisabled;
  clearBtn.disabled = isDisabled;
  if ( isDisabled ) {
    minifyBtn.classList.add( 'opacity-50', 'cursor-not-allowed' );
    clearBtn.classList.add( 'opacity-50', 'cursor-not-allowed' )
  } else {
    minifyBtn.classList.remove( 'opacity-50', 'cursor-not-allowed' );
    clearBtn.classList.remove( 'opacity-50', 'cursor-not-allowed' )
  }
}
document.getElementById( 'js-input' ).addEventListener( 'input', function() {
  toggleButtonState( 'js-input', 'minify-js', 'clear-js' )
} );
document.getElementById( 'css-input' ).addEventListener( 'input', function() {
  toggleButtonState( 'css-input', 'minify-css', 'clear-css' )
} );
document.addEventListener( 'DOMContentLoaded', function() {
  toggleButtonState( 'js-input', 'minify-js', 'clear-js' );
  toggleButtonState( 'css-input', 'minify-css', 'clear-css' )
} );
document.getElementById( 'js-tab' ).addEventListener( 'click', function() {
  document.getElementById( 'js-minifier' ).classList.remove( 'hidden' );
  document.getElementById( 'css-minifier' ).classList.add( 'hidden' );
  this.classList.add( 'tab-active', 'text-white', 'bg-indigo-500' );
  this.classList.remove( 'text-gray-600' );
  document.getElementById( 'css-tab' ).classList.remove( 'tab-active', 'text-white', 'bg-indigo-500' );
  document.getElementById( 'css-tab' ).classList.add( 'text-gray-600' )
} );
document.getElementById( 'css-tab' ).addEventListener( 'click', function() {
  document.getElementById( 'css-minifier' ).classList.remove( 'hidden' );
  document.getElementById( 'js-minifier' ).classList.add( 'hidden' );
  this.classList.add( 'tab-active', 'text-white', 'bg-indigo-500' );
  this.classList.remove( 'text-gray-600' );
  document.getElementById( 'js-tab' ).classList.remove( 'tab-active', 'text-white', 'bg-indigo-500' );
  document.getElementById( 'js-tab' ).classList.add( 'text-gray-600' )
} );
document.getElementById( 'minify-js' ).addEventListener( 'click', function() {
  const input = document.getElementById( 'js-input' ).value;
  const originalSize = input.length;
  const minified = minifyJS( input );
  const minifiedSize = minified.length;
  const savings = Math.round( ( 1 - minifiedSize / originalSize ) * 100 );
  document.getElementById( 'js-output' ).value = minified;
  document.getElementById( 'js-stats' ).textContent = `${originalSize}chars → ${minifiedSize}chars(${savings}% saved)`;
  const btn = this;
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 mr-2" viewBox="0 0 24 24" fill="none">
<path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Minified!`;
  btn.classList.remove( 'from-indigo-500', 'to-indigo-600' );
  btn.classList.add( 'from-green-500', 'to-green-600' );
  setTimeout( () => {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 mr-2" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M13.1213 10.7782L18.7782 5.12134" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.1213 10.7782L12.7678 6.88911" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.1213 10.7782L17.0104 11.1318" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L5.12131 18.7781" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L11.1317 17.0104" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L6.88908 12.7677" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg> Minify JS`;
    btn.classList.remove( 'from-green-500', 'to-green-600' );
    btn.classList.add( 'from-indigo-500', 'to-indigo-600' )
  }, 2000 )
} );
document.getElementById( 'minify-css' ).addEventListener( 'click', function() {
  const input = document.getElementById( 'css-input' ).value;
  const originalSize = input.length;
  const minified = minifyCSS( input );
  const minifiedSize = minified.length;
  const savings = Math.round( ( 1 - minifiedSize / originalSize ) * 100 );
  document.getElementById( 'css-output' ).value = minified;
  document.getElementById( 'css-stats' ).textContent = `${originalSize}chars → ${minifiedSize}chars(${savings}% saved)`;
  const btn = this;
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 mr-2" viewBox="0 0 24 24" fill="none">
<path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Minified!`;
  btn.classList.remove( 'from-indigo-500', 'to-indigo-600' );
  btn.classList.add( 'from-green-500', 'to-green-600' );
  setTimeout( () => {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 mr-2" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M13.1213 10.7782L18.7782 5.12134" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.1213 10.7782L12.7678 6.88911" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.1213 10.7782L17.0104 11.1318" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L5.12131 18.7781" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L11.1317 17.0104" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7782 13.1213L6.88908 12.7677" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg> Minify CSS`;
    btn.classList.remove( 'from-green-500', 'to-green-600' );
    btn.classList.add( 'from-indigo-500', 'to-indigo-600' )
  }, 2000 )
} );
document.getElementById( 'copy-js' ).addEventListener( 'click', function() {
  copyToClipboard( 'js-output' );
  showTooltip( this, 'Copied!' )
} );
document.getElementById( 'copy-css' ).addEventListener( 'click', function() {
  copyToClipboard( 'css-output' );
  showTooltip( this, 'Copied!' )
} );
document.getElementById( 'clear-js' ).addEventListener( 'click', function() {
  document.getElementById( 'js-input' ).value = '';
  document.getElementById( 'js-output' ).value = '';
  document.getElementById( 'js-stats' ).textContent = '0 chars → 0 chars(0% saved)'
} );
document.getElementById( 'clear-css' ).addEventListener( 'click', function() {
  document.getElementById( 'css-input' ).value = '';
  document.getElementById( 'css-output' ).value = '';
  document.getElementById( 'css-stats' ).textContent = '0 chars → 0 chars(0% saved)'
} );
function minifyJS( code ) {
  if ( !code.trim() ) return '';
  return code.replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1' ).replace( /\s+/g, ' ' ).replace( /^\s+|\s+$/g, '' ).replace( /\s*([{}()[\];,:])\s*/g, '$1' ).replace( /}/g, '}' )
}

function minifyCSS( code ) {
  if ( !code.trim() ) return '';
  return code.replace( /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1' ).replace( /\s+/g, ' ' ).replace( /\s*([{};:,])\s*/g, '$1' ).replace( /}/g, '}' ).replace( /:\s+/g, ':' ).replace( /\s+{/g, '{' ).trim()
}

function copyToClipboard( elementId ) {
  const element = document.getElementById( elementId );
  element.select();
  document.execCommand( 'copy' )
}

function showTooltip( element, message ) {
  const tooltip = document.createElement( 'div' );
  tooltip.className = 'absolute bg-indigo-600 text-white px-2 py-1 rounded text-sm';
  tooltip.textContent = message;
  tooltip.style.top = '-30px';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  element.style.position = 'relative';
  element.appendChild( tooltip );
  setTimeout( () => {
    tooltip.remove()
  }, 2000 )
}
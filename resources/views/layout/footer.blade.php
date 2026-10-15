   <footer class="bg-gray-900 text-white py-16">
       <div class="container mx-auto px-4">
           <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
               <div>
                   <div class="text-xl flex items-center mb-2">
                       <img src="{{ asset('admin-assets/images/logo-white.png') }}" class="w-8 mr-2" alt="">
                       <span class="font-semibold">{{ $data['h-0'] . ' ' . $data['h-1'] }}</span>
                   </div>
                   <p class="text-gray-400 text-sm">{{ $data['f-0'] }}</p>
               </div>

               <!-- Tools -->
               <div>
                   <h4 class="text-lg font-semibold mb-4">{{ $data['h-3'] }}</h4>
                   <ul class="space-y-2 text-sm">
                       <li><a href="{{ route('age-calculator') }}"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-14'] }}</a>
                       </li>
                       <li><a href="{{ route('text-encoder') }}"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-10'] }}</a>
                       </li>
                       <li><a href="{{ route('construction-calculator') }}"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-7'] }}</a>
                       <li><a href="{{ route('budget-calculator') }}"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-6'] }}</a></li>
                       </li>
                   </ul>
               </div>

               <!-- Company -->
               <div>
                   <h4 class="text-lg font-semibold mb-4">{{ $data['f-1'] }}</h4>
                   <ul class="space-y-2 text-sm">
                       <li><a href="#"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-2'] }}</a></li>
                       <li><a href="#"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-19'] }}</a></li>
                       <li><a href="#"
                               class="text-gray-400 hover:text-white transition-all">{{ $data['h-20'] }}</a></li>
                   </ul>
               </div>

               <!-- Newsletter - Fixed section -->
               <div class="w-full">
                   <h4 class="text-lg font-semibold mb-4">{{ $data['f-2'] }}</h4>
                   <p class="text-gray-400 text-sm mb-4">{{ $data['f-3'] }}</p>
                   <div class="flex flex-col sm:flex-row gap-0 w-full">
                       <input type="email"
                           class="bg-gray-800 text-white p-3 focus:outline-none rounded-lg sm:rounded-l-lg sm:rounded-r-none w-full"
                           placeholder="{{ $data['f-4'] }}" />
                       <button
                           class="bg-indigo-500 text-white p-3 hover:bg-indigo-600 rounded-lg sm:rounded-r-lg sm:rounded-l-none w-full sm:w-auto mt-2 sm:mt-0 whitespace-nowrap">
                           {{ $data['f-5'] }}
                       </button>
                   </div>
               </div>
           </div>

           <!-- Footer Bottom -->
           <div
               class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
               <p>{{ $data['f-6'] }}</p>
               <div class="flex space-x-3">
                   <a href="#"
                       class="flex items-center justify-center hover:text-indigo-500 transition-all">{{ $data['f-7'] }}</a>
                   <a href="#"
                       class="flex items-center justify-center hover:text-indigo-500 transition-all">{{ $data['f-8'] }}</a>
               </div>
           </div>
       </div>
   </footer>

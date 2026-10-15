@extends('admin.master.layout')
@section('main')
    <main class="flex-1 overflow-y-auto px-6 pt-24 bg-gray-50 dark:bg-gray-900/50 custom-scrollbar">
        <!-- Will trigger auto-toast on page load -->
        <div class="flex">
            <button
                class="open-modal bg-indigo-600 text-white px-4 py-2 rounded-lg m-4 shadow-lg dark:hover:shadow-indigo-800 hover:shadow-indigo-300 transition-all duration-300"
                data-modal="add-user-modal">Add New User</button>
        </div>
        <!-- Recent Orders Table -->
        <div
            class="mt-5 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Recent Orders</h2>

            </div>
            <div class="overflow-x-auto p-4">
                <table id="Datatable" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Name</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Username</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        @forelse ($users as $user)
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {{ $user->name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {{ $user->username }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    @if ($user->user_role == '2')
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">Manager</span>
                                    @else
                                        <span
                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200">Editor</span>
                                    @endif
                                </td>
                                <td
                                    class="flex justify-center gap-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <a href="" class="text-emerald-600 font-medium p-2">
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
                                    <button class="open-modal text-red-500 p-2" data-modal="delete-user-modal"
                                        data-user-id="{{ $user->id }}">
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
    <!-- Modal -->
    <div id="add-user-modal" class="modal hidden fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50">
        <div
            class="border-b-1 border-gray-400 modal-content bg-white dark:bg-gray-800 text-gray-800 dark:text-white mx-auto mt-[8%] p-6 rounded-lg w-11/12 max-w-xl relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"
                class="w-5 h-6 absolute top-2 right-2 cursor-pointer close-btn">
                <path fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
            <h2
                class="text-xl font-bold mb-4 pb-2 border-b dark:border-gray-700 border-gray-300 text-gray-700 dark:text-gray-200">
                Add New User</h2>
            <form class="space-y-4 border-1 border-indigo-200 pt-6" action="{{ route('register-function') }}"
                method="POST">
                @csrf
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="plotArea" class="block text-sm font-medium ">Name</label>
                        <input type="text" name="name" min="0" step="0.1"
                            class="mt-1 block w-full p-2 rounded-md border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                            style="outline:none;" required>
                    </div>
                    <div>
                        <label for="areaUnit" class="block text-sm font-medium ">Username</label>
                        <input type="text" name="username" min="0" step="0.1"
                            class="mt-1 block w-full p-2 rounded-md border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                            style="outline:none;" required>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="numFloors" class="block text-sm font-medium">Password</label>
                        <input type="text" name="password" min="1" step="1"
                            class="mt-1 block w-full p-2 rounded-md border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                            style="outline:none;" required>
                    </div>
                    <div>
                        <label for="hasBasement" class="block text-sm font-medium t">User Role</label>
                        <select name="user_role"
                            class="mt-1 block w-full p-2 rounded-md border-2 border-gray-200  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                            style="outline:none;">
                            <option class="dark:bg-gray-800 bg-white" value="1">Admin</option>
                            <option class="dark:bg-gray-800 bg-white" value="2">Manager</option>
                            <option class="dark:bg-gray-800 bg-white" value="3">Editor</option>
                        </select>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button
                        class="close-modal px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">Close</button>
                    <button submit class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg">
                        Add
                    </button>
                </div>
            </form>
        </div>
    </div>
    <!-- Delete Modal -->
    <div id="delete-user-modal" class="modal hidden fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50">
        <div
            class="border-b-1 border-gray-400 modal-content bg-white dark:bg-gray-800 text-gray-800 dark:text-white mx-auto mt-[8%] p-6 rounded-lg w-11/12 max-w-xl relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"
                class="w-5 h-6 absolute top-2 right-2 cursor-pointer close-btn">
                <path fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
            <h2
                class="text-xl font-bold mb-4 pb-2 border-b dark:border-gray-700 border-gray-300 text-gray-700 dark:text-gray-200">
                Delete User</h2>
            <form id="delete-user-form" class="space-y-4 border-1 border-indigo-200" method="POST">
                @csrf
                @method('DELETE')
                <div class="py-3 text-2xl">
                    Delete The user Are You Sure?
                </div>
                <div class="flex justify-between">
                    <button type="button"
                        class="close-modal px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300">Cancle</button>
                    <button id="delete-user" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                        Delete
                    </button>
                </div>
            </form>
        </div>
    </div>
    <script>
        // Setup: when trash icon is clicked
        document.querySelectorAll('.open-modal[data-modal="delete-user-modal"]').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                const modal = document.getElementById('delete-user-modal');
                const form = document.getElementById('delete-user-form');

                // Set form action
                form.setAttribute('action', `/users/${userId}`);

                // Show modal
                modal.classList.remove('hidden');
            });
        });

        // Optional: Close modal on cancel or close button
        document.querySelectorAll('.close-modal, .close-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.getElementById('delete-user-modal').classList.add('hidden');
            });
        });
    </script>
@endsection
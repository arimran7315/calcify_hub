<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAdminAccess;
use App\Http\Middleware\ValidUser;
use Illuminate\Support\Facades\Route;

// Routes for default locale (en) without prefix
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/age-calculator', [HomeController::class, 'index'])->name('age-calculator');
Route::get('/tax-calculator', [HomeController::class, 'index'])->name('tax-calculator');
Route::get('/budget-base-solar-estimator', [HomeController::class, 'index'])->name('budget-calculator');
Route::get('/usage-base-solar-estimator', [HomeController::class, 'index'])->name('solar-calculator');
Route::get('/image-converter', [HomeController::class, 'index'])->name('image-converter');
Route::get('/construction-cost-estimator', [HomeController::class, 'index'])->name('construction-calculator');
Route::get('/encode-decode-text', [HomeController::class, 'index'])->name('text-encoder');
Route::get('/text-formater', [HomeController::class, 'index'])->name('text-formater');
Route::get('/document-convertor', [HomeController::class, 'index'])->name('docs-convertor');
Route::get('/minifier', [HomeController::class, 'index'])->name('minifier');
Route::get('/unminifier', [HomeController::class, 'index'])->name('un-minifier');
Route::get('/about-us', [HomeController::class, 'about'])->name('about');
Route::get('/contact-us', [HomeController::class, 'contact'])->name('contact');
Route::get('/compare-text', [HomeController::class, 'index'])->name('compare-text');
Route::get('/merge-pdf', [HomeController::class, 'index'])->name('merge-pdf');
Route::get('/generate-pdf', [HomeController::class, 'index'])->name('generate-pdf');
Route::get('/image-to-text', [HomeController::class,'index'])->name('image-text');
Route::get('/admin/login', function () {
    return view('admin.login');
})->name('login');
Route::get('/admin/register', function () {
    return view('admin.addUser');
})->name('register');
Route::get('/admin/addPage', function () {
    return view('admin.addPage');
})->name('addPage');
Route::get('/profile', function () {
    return view('admin.profile');
})->name('profile');
Route::get('/test', function () {
    return view('admin.index');
})->name('test');

Route::get('getdata/{id}',[UserController::class,'getData']);
Route::get('getparent',[UserController::class,'getParent']);
Route::get('/admin', [UserController::class, 'index'])->name('admin-home')->middleware(ValidUser::class);
Route::get('/admin/users', [UserController::class, 'users'])->name('users')->middleware(CheckAdminAccess::class);
Route::get('/admin/editPage/{id}', [UserController::class, 'editPage'])->name('editPage');
Route::post('/addPage', [UserController::class, 'addPage'])->name('addPage-function');
Route::put('/update-page/{id}', [UserController::class, 'updatePage'])->name('updatePage-function');
Route::post('/login', [UserController::class, 'login'])->name('login-function');
Route::post('/register', [UserController::class, 'register'])->name('register-function');
Route::get('/logout', [UserController::class, 'logout'])->name('logout');
Route::delete('/users/{id}', [UserController::class, 'destroyUser'])->name('user.delete');
Route::delete('/pages/{id}', [UserController::class, 'destroyPage'])->name('page.delete');
Route::group(['prefix' => '{locale}', 'where' => ['locale' => '[a-zA-Z]{2}'], 'middleware' => function ($request, $next) {
    if ($request->segment(1) === 'en') {
        return redirect($request->path());
    }
    return $next($request);
}], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home.locale');
    Route::get('/age-calculator', [HomeController::class, 'index'])->name('age-calculator.locale');
    Route::get('/tax-calculator', [HomeController::class, 'index'])->name('tax-calculator.locale');
    Route::get('/budget-base-solar-estimator', [HomeController::class, 'index'])->name('budget-calculator.locale');
    Route::get('/usage-base-solar-estimator', [HomeController::class, 'index'])->name('solar-calculator.locale');
    Route::get('/image-converter', [HomeController::class, 'index'])->name('image-converter.locale');
    Route::get('/construction-cost-estimator', [HomeController::class, 'index'])->name('construction-calculator.locale');
    Route::get('/encode-decode-text', [HomeController::class, 'index'])->name('text-encoder.locale');
    Route::get('/text-formater', [HomeController::class, 'index'])->name('text-formater.locale');
    Route::get('/document-convertor', [HomeController::class, 'index'])->name('docs-convertor.locale');
    Route::get('/minifier', [HomeController::class, 'index'])->name('minifier.locale');
    Route::get('/unminifier', [HomeController::class, 'index'])->name('un-minifier.locale');
    Route::get('/about-us', [HomeController::class, 'about'])->name('about.locale');
    Route::get('/contact-us', [HomeController::class, 'contact'])->name('contact.locale');
});

Route::get('/language/{locale}', function ($locale) {
    $currentRouteName = Route::currentRouteName();
    $parameters = request()->route()->parameters();
    $newLocale = $locale === 'en' ? null : $locale;
    $newParameters = array_merge($parameters, $newLocale ? ['locale' => $newLocale] : []);
    $newRouteName = $newLocale ? str_replace('.locale', '', $currentRouteName) . '.locale' : str_replace('.locale', '', $currentRouteName);
    return redirect()->route($newRouteName, $newParameters);
})->name('language.switch');
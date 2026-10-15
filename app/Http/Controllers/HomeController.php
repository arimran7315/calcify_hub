<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $locale = $request->segment(1) ?? 'en';
        if ($locale === 'en' && $request->segment(1)) {
            return redirect($request->path());
        }
        $url = '/' . ($locale === 'en' ? ltrim($request->path(), '/en/') : $request->path());
        $page = Page::where('url', $url)->firstOrFail();
        $title = $page->title;
        $description = $page->description;
        $data = json_decode($page->data, true);
        return view('home', compact('title','description','data'));
    }

    public function contact(Request $request)
    {
        $locale = $request->segment(1) ?? 'en';
        if ($locale === 'en' && $request->segment(1)) {
            return redirect($request->path());
        }
        $url = '/' . ($locale === 'en' ? ltrim($request->path(), '/en/') : $request->path());
        $page = Page::where('url', $url)->first();

        $title = $page->title;
        $description = $page->description;
        $data = json_decode($page->data, true);

        return view('contact', compact('title','description', 'data'));
    }

    public function about(Request $request)
    {
        $locale = $request->segment(1) ?? 'en';
        if ($locale === 'en' && $request->segment(1)) {
            return redirect($request->path());
        }
        $url = '/' . ($locale === 'en' ? ltrim($request->path(), '/en/') : $request->path());
        $page = Page::where('url', $url)->first();

        $title =$page->title;
        $description = $page->description;
        $data = json_decode($page->data, true);

        return view('about', compact('title','description', 'data'));
    }
}

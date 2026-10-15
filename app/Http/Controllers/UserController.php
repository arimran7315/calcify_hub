<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $pages = Page::select('id', 'url', 'title', 'data')->get();
        $users = User::count();
        $activePages = Page::where('data', '!=', '"{}"')
            ->whereNotNull('data')
            ->count();
        $manager = User::where('user_role', Auth::user()->user_role == 1 ? 2 : 1)->count();
        $editor = User::where('user_role', 3)->count();
        return view('admin.home', compact('pages', 'users', 'activePages', 'manager', 'editor'));
    }
    public function users()
    {
        $users = User::whereNot('user_role', 1)->select('id', 'name', 'username', 'user_role')->whereNot('id', Auth::user()->id)->get();
        return view('admin.users', compact('users'));
    }
    public function register(Request $request)
    {

        // return $request;
        $create = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => $request->password,
            'user_role' => $request->user_role
        ]);
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'New User Added Successfully!!'
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ], [
            'email.required' => 'Email field is required!',
            'password.required' => 'Password field is required!',
        ]);
        if (Auth::attempt(['username' => $request->email, 'password' => $request->password])) {
            return redirect()->route('admin-home');
        } else {
            return back()->with([
                'type' => 'red',
                'message' => ' Invalid username or password!'
            ]);
        }
        return $request;
    }
    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }
    public function addPage(Request $request)
    {
        $request->validate([
            'url' => 'required|unique:pages,url'
        ]);
        $keyValuePairs = [];

        if (isset($request['key']) && isset($request['value'])) {
            foreach ($request['key'] as $index => $key) {
                if ($key !== null && isset($request['value'][$index]) && $request['value'][$index] !== null) {
                    $keyValuePairs[$key] = $request['value'][$index];
                }
            }
        }
        $jsonData = json_encode($keyValuePairs, JSON_FORCE_OBJECT);

        Page::create([
            'url' => $request->url,
            'title' => $request->title,
            'description' => $request->description,
            'data' => $jsonData,
        ]);
        return redirect()->route('admin-home');
    }
    public function editPage(string $id)
    {
        $page = Page::find($id);
        return view('admin.editPage', compact('page'))->with('toast', [
            'type' => 'success',
            'message' => 'New Page Added SuccessFully!!'
        ]);
    }
    public function updatePage(Request $request, $id)
    {
        $request->validate([
            'url' => 'unique:pages,url,' . $id . ',id'
        ]);

        $keyValuePairs = [];

        if (isset($request['key']) && isset($request['value'])) {
            foreach ($request['key'] as $index => $key) {
                if ($key !== null && isset($request['value'][$index]) && $request['value'][$index] !== null) {
                    $keyValuePairs[$key] = $request['value'][$index];
                }
            }
        }

        $jsonData = json_encode($keyValuePairs, JSON_FORCE_OBJECT);

        $page = Page::findOrFail($id);

        $page->update([
            'url' => $request->url,
            'title' => $request->title,
            'description' => $request->description,
            'data' => $jsonData,
        ]);

        return redirect()->route('admin-home')->with('toast', [
            'type' => 'success',
            'message' => 'Update Page SuccessFully!!'
        ]);
    }
    public function destroyUser($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Delete User SuccessFully!!'
        ]);
    }
    public function getData($id)
    {
         $page = Page::where('id', $id)
            ->select('data', 'title', 'description')
            ->first();


        $decoded = $page && $page->data ? json_decode($page->data, true) : [];

        $keyValueData = [];

        foreach ($decoded as $key => $value) {
            $keyValueData[] = [
                'key' => $key,
                'value' => $value
            ];
        }

        return response()->json([
            'status' => true,
            'message' => 'Data retrieved successfully',
            'data' => $keyValueData,
            'title' => $page->title,
            'description' => $page->description
        ]);
    }
    public function getParent()
    {
        $pages = Page::where(function ($query) {
            $query->where('url', 'not like', '/ur%')
                ->orWhereNull('url')
                ->orWhere('url', '');
        })->select('id', 'url', 'title')->get();
        return response()->json([
            'status' => true,
            'message' => "get data successfully",
            'pages' => $pages
        ], 200);
    }
    public function destroyPage($id)
    {
        Page::findOrFail($id)->delete();
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Delete Page SuccessFully!!'
        ]);
    }
}

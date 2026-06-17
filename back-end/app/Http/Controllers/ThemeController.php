<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ThemeController extends Controller
{
    public function index()
    {
        return Theme::all();
    }

    public function show()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
        return UserSetting::with(['user', 'theme'])->where('user_id', $userId)->get();
    }

    public function update(Request $request)
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;

        $settings = UserSetting::with('theme')->where('user_id', '=', $userId)->first();
        $settings->theme_id = $request->theme_id;
        $settings->written_font = $request->written_font;
        $settings->save();

        return UserSetting::with('theme')->where('user_id', '=', $userId)->first();
    }
}

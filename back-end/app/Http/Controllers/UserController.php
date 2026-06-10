<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ToDo: alleen email en gebruikersnaam meegeven
        return User::all();
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return User::query()->findOrFail($id);

    }

    public function login(Request $request)
    {
        try {

            // check of alle velden ingevult zijn
            if (!$request->password || !$request->email) {
                return response(['error' => 'placed not filled'], 404);
            }

            // check of de email bestaat zo niet error
            $user = User::query()->where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['error' => 'user not found'], 403);
            }

            // check of het wachtwoord overeen komt zo niet error
            if (Hash::check($request->password, $user->password)) {
                try {
                    $token = JWTAuth::fromUser($user);
                } catch (JWTException $e) {
                    return response()->json(['error' => 'Could not create token'], 500);
                }
                return response()->json([
                    'token' => $token,
                    'user' => $user,
                ], 201);
            } else {
                return response()->json(['error' => 'you are stupid'], 404);
            }
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    public function register(request $request)
    {
        try {

            // check als ze ingelogged zijn zo niet error
            if (!$request->password || !$request->email || !$request->user_name) {
                return response()->json(['error' => 'placed not filled'], 403);
            }

            // kijken of de user en / email al bestaan in het systeem zowel error
            $existingUser = User::query()->where('email', $request->email)->orWhere('user_name', $request->user_name)->first();
            if ($existingUser) {
                return response(['error' => 'username or email already exist'], 401);
            }

            // kijken of het wachtwoord goed is? is het een echte email?
            $request->validate([
                'email' => 'required|email'
            ]);

            // geen errors? maak een nieuwe user aan
            $register = User::query()->create([
                'email' => $request->email,
                'name' => $request->user_name,
                'user_name' => $request->user_name,
                'password' => Hash::make($request->password),
                'profile_image' => $request->profile_image,
            ]);

            // user opslaan
            $register->save();

            //token aanmaken anders error
            try {
                $token = JWTAuth::fromUser($register);
            } catch (JWTException $e) {
                return response()->json(['error' => 'Could not create token'], 500);
            }

            // user terug sturen met de token
            return response()->json([
                'token' => $token,
                'user' => $register,
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, request $request)
    {
        try {

            // checken of alle velden ingevuld zijn
            if (!$request->email || !$request->user_name) {
                return response(['error' => 'placed not filled'], 401);
            };
            // user ophalen via id
            $user = User::query()->findOrFail($id); // dit is de user waar het id is meegegeven.

            // checken of email of username al bestaat
            $existingUser = User::query()->where('email', $request->email)->orWhere('user_name', $request->user_name)->first();
            if ($existingUser->id != $id && $existingUser->email != $request->email || $existingUser->id != $id && $existingUser->user_name != $request->user_name) {
                return response(['error' => 'username or email already exist'], 401);
            }
            // user updaten als er geen error is.
            $user->update([
                'email' => $request->email,
                'name' => $request->user_name,
                'user_name' => $request->user_name,
                'profile_image' => $request->profile_image,
            ]);

            // velden saven
            $user->save();

            // user terugsturen
            return $user;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::query()->findOrFail($id);
        $user->delete();
        return $user;
    }
}

// ToDo: Change password route aanmaken.

// ToDo: Logout route aanmaken.


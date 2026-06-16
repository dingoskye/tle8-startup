<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\MainTask;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
//        echo JWTAuth::parseToken()->authenticate()->id;
//        echo $userId;

        return Group::with('users')->whereHas('users', function ($query) use ($userId) {
            $query->where('users.id', $userId);
        })->get();
    }


    public function create(request $request)
    {
        try {
            if (!$request->name || !$request->role) {
                return response(['error' => 'you are stupid'], 404);
            }
            // todo aanpassen naar admin ipv user_id

            $userId = JWTAuth::parseToken()->authenticate()->id;

            $group = new Group([
                'name' => $request->name,
                'description' => $request->description,

                'image' => $request->image,
            ]);
            $group->save();

            $group->users()->attach($userId, [
                'role' => $request->role,
            ]);


            return $group;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
        $group = Group::query()->findOrFail($id);
        // todo aanpassen naar admin ipv user_id
        if ($group->user_id === $userId) {
            return $group;
        } else {
            return response()->json(['error' => 'you are not authorized'], 403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, request $request)
    {
        try {

            if (!$request->name || !$request->role) {
                return response(['error' => 'you are stupid'], 404);
            }

            $group = Group::query()->findOrFail($id);
            $userId = JWTAuth::parseToken()->authenticate()->id;
            // todo aanpassen naar admin ipv user_id
            if ($group->user_id = $userId) {

                $group->update([
                    'name' => $request->name ?? $group->name,
                    'description' => $request->description ?? $group->description,
                ]);
                $group->users()->updateExistingPivot($userId, [
                    'role' => $request->role ?? $group->role
                ]);
                return $group;
            } else {
                return response()->json(['error' => 'you are not authorized'], 403);
            }
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
        $group = Group::query()->findOrFail($id);
        // todo aanpassen naar admin ipv user_id
        if ($group->user_id === $userId) {

            $group->delete();
            return $group;
        } else {
            return response()->json(['error' => 'you are not authorized'], 403);
        }
    }

    public function createLink(string $id)
    {
        try {
            // link aanmaken (in backend)
            $code = bin2hex(random_bytes(6));
            // Group id opvangen
            $group = Group::query()->findOrFail($id);
            // link in database zetten
            $group->update([
                'invite_link' => $code
            ]);
            // link naar front-end sturen
            return json_encode($code);

        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    public function addUser(request $request)
    {
        try {
            // pak de user als die ingelogd is
            $userId = JWTAuth::parseToken()->authenticate()->id;

            // pak de group van de invite link
            $group = Group::where('invite_link', $request->code)->first();
          
            if (!$group) {
                return response(['error' => 'Invite link not found'], 404);
            }
            // als de user al in de groep is stuur de user terug
            if ($group) {
                foreach ($group->users as $user) {
                    if ($user->id === $userId) {
                        return response(['error' => 'Already in the group'], 401);
                    }
                }
            }


            // voeg de user toe aan de groep met de role user.
            $group->users()->attach($userId, [
                'role' => 'user'
            ]);

            // stuur de groep terug
            return $group;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }
}

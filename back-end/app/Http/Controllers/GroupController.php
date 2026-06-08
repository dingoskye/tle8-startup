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
                'user_id' => $userId
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
}

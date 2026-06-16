<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\MainTask;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Group::all();
    }


    public function create(request $request)
    {
        try {
            if (!$request->name || !$request->role) {
                return response(['error' => 'you are stupid'], 404);
            }
            $group = new Group([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $request->image,
                'user_id' => $request->user_id
            ]);
            $group->save();

            $group->users()->attach($request->user_id, [
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
//       $userId = JWTAuth::parseToken()->authenticate()->id;
        //       $group = Group::with('users')->findOrFail($id);

//        if ($group->users->contains('id', $userId)) {
        return Group::with(['users', 'mainTasks' => function ($query) {
            $query->orderBy('deadline', 'asc');
        }])->findOrFail($id);
//        } else {
//            return response()->json(['error' => 'you are not authorized'], 403);
//        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, request $request)
    {
        try {
            echo $request->role;
            if (!$request->name || !$request->role || !$request->user_id) {
                return response(['error' => 'you are stupid'], 404);
            }
            $group = Group::query()->findOrFail($id);

            $group->update([
                'name' => $request->name ?? $group->name,
                'description' => $request->description ?? $group->description,
            ]);
            $group->users()->updateExistingPivot($request->user_id, [
                'role' => $request->role ?? $group->role
            ]);


            return $group;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $group = Group::query()->findOrFail($id);
        $group->delete();
        return $group;
    }
}

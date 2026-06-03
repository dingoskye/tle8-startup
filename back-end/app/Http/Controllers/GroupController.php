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
                'role' => $request->role,
                'user_id' => $request->user_id
            ]);

            $group->save();

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
        return User::query()->findOrFail($id);
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
            $group->users()->updateExistingPivot($request->user_id, [
                'role' => $request->role
            ]);

            $group->update([
                'name' => $request->name
            ]);

            return $group;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

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

            //save the uploaded file to the server
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('groups', 'public');
            }

            $group = new Group([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $imagePath,
                'user_id' => $request->user_id
            ]);
            $group->save();

            //Loop through the array of members sent by React
            if ($request->members) {
                $memberIds = json_decode($request->members);
                foreach ($memberIds as $id) {
                    $group->users()->attach($id, ['role' => $request->role]);
                }
            } else {
                $group->users()->attach($request->user_id, [
                    'role' => $request->role,
                ]);
            }

            return $group;

        } catch (\Exception $e) {
            // This will now catch ALL database errors and send the exact message to React!
            return response(['error' => $e->getMessage()], 500);
        }
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

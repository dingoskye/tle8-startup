<?php

namespace App\Http\Controllers;

use App\Models\SubTask;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class SubTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubTask::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(request $request)
    {
        if (!$request->title || !$request->main_task_id || !$request->user_id) {
            return response(['error' => 'you are stupid'], 404);
        }
        try {
            $subTask = new SubTask([
                'title' => $request->title,
                'user_id' => $request->user_id,
                'description' => $request->description,
                'main_task_id' => $request->main_task_id,
            ]);

            $subTask->save();

            return $subTask;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return SubTask::query()->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, request $request)
    {
        try {

            if (!$request->title || !$request->main_task_id || !$request->user_id) {
                return response(['error' => 'you are stupid'], 404);
            }
            $subTask = SubTask::query()->findOrFail($id);

            $subTask->update([
                'title' => $request->title ?? $subTask->title,
                'user_id' => $request->user_id ?? $subTask->user_id,
                'description' => $request->description ?? $subTask->description,
                'main_task_id' => $request->main_task_id ?? $subTask->main_task_id,
                'group_id' => $request->group_id ?? $subTask->group_id,

            ]);
            $subTask->save();
            return $subTask;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $subTask = SubTask::query()->findOrFail($id);
        $subTask->delete();
        return $subTask;
    }
}

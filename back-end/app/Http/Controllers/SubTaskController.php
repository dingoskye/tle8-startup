<?php

namespace App\Http\Controllers;

use App\Models\SubTask;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SubTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
        return SubTask::where('user_id', $userId)->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(request $request)
    {
        try {
            if (!$request->title || !$request->main_task_id) {
                return response(['error' => 'you are stupid'], 404);
            }

            $userId = JWTAuth::parseToken()->authenticate()->id;

            $subTask = new SubTask([
                'title' => $request->title,
                'user_id' => $userId,
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
        $userId = JWTAuth::parseToken()->authenticate()->id;
        if ($userId === $id) {
            return SubTask::query()->findOrFail($id);
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
            if (!$request->title || !$request->main_task_id) {
                return response(['error' => 'you are stupid'], 404);
            }
            $subTask = SubTask::query()->findOrFail($id);
            $userId = JWTAuth::parseToken()->authenticate()->id;
            if ($subTask->user_id === $userId) {
                $subTask->update([
                    'title' => $request->title ?? $subTask->title,
                    'user_id' => $userId,
                    'description' => $request->description ?? $subTask->description,
                    'main_task_id' => $request->main_task_id ?? $subTask->main_task_id,
                    'group_id' => $request->group_id ?? $subTask->group_id,

                ]);
                $subTask->save();
                return $subTask;
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
        $subTask = SubTask::query()->findOrFail($id);
        
        if ($userId === $subTask->user_id) {
            $subTask->delete();
            return $subTask;
        } else {
            return response()->json(['error' => 'you are not authorized'], 403);
        }
    }
}

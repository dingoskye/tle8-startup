<?php

namespace App\Http\Controllers;


use App\Models\MainTask;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

class MainTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MainTask::with('group')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(request $request)
    {
        if (!$request->title || !$request->deadline || !$request->ai_file) {
            return response(['error' => 'you are stupid'], 404);
        }
        try {
            $mainTask = new MainTask([
                'title' => $request->title,
                'deadline' => $request->deadline,
                'description' => $request->description,
                'ai_file' => $request->ai_file,
                'group_id' => $request->group_id,

            ]);
            $mainTask->save();

            $mainTask->users()->attach($request->user_id, [
                'level' => $request->level ?? "beginner",
                'progress' => $request->progress ?? 0,
                'score' => $request->score ?? null,
            ]);


            return $mainTask;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return MainTask::query()->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, request $request)
    {
        try {

            if (!$request->title || !$request->deadline || !$request->ai_file) {
                return response(['error' => 'you are stupid'], 404);
            }
            $mainTask = MainTask::query()->findOrFail($id);

            // is kinda redundant, but we'll leave it there for safety
            $mainTask->update([
                'title' => $request->title ?? $mainTask->title,
                'deadline' => $request->deadline ?? $mainTask->deadline,
                'description' => $request->description ?? $mainTask->description,
                'ai_file' => $request->ai_file ?? $mainTask->ai_file,
                'group_id' => $request->group_id ?? $mainTask->group_id,

            ]);
            $mainTask->save();

            $mainTask->users()->updateExistingPivot($request->user_id, [
                'level' => $request->level ?? $mainTask->level,
                'progress' => $request->progress ?? $mainTask->progress,
                'score' => $request->score ?? $mainTask->score,
            ]);
            return $mainTask;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $mainTask = MainTask::query()->findOrFail($id);
        $mainTask->delete();
        return $mainTask;
    }
}

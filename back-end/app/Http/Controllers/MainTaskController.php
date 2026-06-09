<?php

namespace App\Http\Controllers;


use App\Models\MainTask;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use function Laravel\Prompts\error;

class MainTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;

        return MainTask::with(['group', 'users'])->whereHas('users', function ($query) use ($userId) {
            $query->where('users.id', $userId);
        })->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(request $request)
    {
        try {

            if (!$request->title || !$request->deadline || !$request->ai_file) {
                return response(['error' => 'you are stupid'], 404);
            }
// todo aanpassen naar admin ipv user_id
            $userId = JWTAuth::parseToken()->authenticate()->id;

            $mainTask = new MainTask([
                'title' => $request->title,
                'deadline' => $request->deadline,
                'description' => $request->description,
                'ai_file' => $request->ai_file,
                'group_id' => $request->group_id,

            ]);
            $mainTask->save();

            $mainTask->users()->attach($userId, [
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
        $userId = JWTAuth::parseToken()->authenticate()->id;
        $mainTask = MainTask::query()->findOrFail($id);
        if ($mainTask->user_id == $userId) {
            return $mainTask;
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

            if (!$request->title || !$request->deadline || !$request->ai_file) {
                return response(['error' => 'you are stupid'], 404);
            }

            $mainTask = MainTask::query()->findOrFail($id);
            $userId = JWTAuth::parseToken()->authenticate()->id;
            // todo aanpassen naar admin ipv user_id
            if ($mainTask->user_id === $userId) {
                $mainTask->update([
                    'title' => $request->title ?? $mainTask->title,
                    'deadline' => $request->deadline ?? $mainTask->deadline,
                    'description' => $request->description ?? $mainTask->description,
                    'ai_file' => $request->ai_file ?? $mainTask->ai_file,
                    'group_id' => $request->group_id ?? $mainTask->group_id,

                ]);
                $mainTask->save();

                $mainTask->users()->updateExistingPivot($userId, [
                    'level' => $request->level ?? $mainTask->level,
                    'progress' => $request->progress ?? $mainTask->progress,
                    'score' => $request->score ?? $mainTask->score,
                ]);
                return $mainTask;
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

// todo aanpassen naar admin ipv user_id
        $userId = JWTAuth::parseToken()->authenticate()->id;
        $mainTask = MainTask::query()->findOrFail($id);

        if ($mainTask->user_id === $userId) {
            $mainTask->delete();
            return $mainTask;
        } else {
            return response()->json(['error' => 'you are not authorized'], 403);
        }
    }
}
// ToDo: file laden op websites

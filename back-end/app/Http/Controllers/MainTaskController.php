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
        //
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
                'ai_file' => $request->ai_file,
                'group_id' => 1
            ]);

            $mainTask->save();

            return $mainTask;
        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

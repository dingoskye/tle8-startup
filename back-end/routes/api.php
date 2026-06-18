<?php

use App\Http\Controllers\MomentController;
use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MainTaskController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubtaskAiController;

// User controller routes
Route::middleware('throttle:60,1')->group(function () {
    Route::post('/user/login', [UserController::class, 'login']);
    Route::post('/user/register', [UserController::class, 'register']);
});
Route::post('/user/login', [UserController::class, 'login']);
Route::post('/user/register', [UserController::class, 'register']);

Route::middleware('jwt')->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/edit/{id}', [UserController::class, 'edit']);


    //AI routes
    Route::get('/main-tasks/{id}/generate-subtasks', [SubtaskAiController::class, 'generate']);
    Route::post('/main-tasks/{mainTask}/generate-subtasks', [SubtaskAiController::class, 'generate']);

    //Group controller routes
//Group controller routes
    //Group controller routes
    Route::post('/group/create', [GroupController::class, 'create']);
    Route::get('/group/', [GroupController::class, 'index']);
    Route::get('/group/{id}', [GroupController::class, 'show']);
    Route::put('/group/edit/{id}', [GroupController::class, 'edit']);
    Route::delete('/group/delete/{id}', [GroupController::class, 'delete']);

    //Main task controller routes
    Route::post('/main/create', [MainTaskController::class, 'create']);
    Route::get('/main/', [MainTaskController::class, 'index']);
    Route::get('/main/details/{id}', [MainTaskController::class, 'show']);
    Route::put('/main/edit/{id}', [MainTaskController::class, 'edit']);
    Route::delete('/main/delete/{id}', [MainTaskController::class, 'delete']);

    //Moment controller routes
    Route::post('/moment/create', [MomentController::class, 'create']);
    Route::get('/moment/', [MomentController::class, 'index']);
    Route::get('/moment/details/{id}', [MomentController::class, 'show']);
    Route::put('/moment/edit/{id}', [MomentController::class, 'edit']);
    Route::delete('/moment/delete/{id}', [MomentController::class, 'delete']);

    //Subtask controller routes
    //Sub task controller routes
    Route::post('/sub/create', [SubTaskController::class, 'create']);
    Route::get('/sub/', [SubTaskController::class, 'index']);
    Route::get('/sub/{id}', [SubTaskController::class, 'show']);
    Route::put('/sub/edit/{id}', [SubTaskController::class, 'edit']);
    Route::patch('/sub/complete/{id}', [SubTaskController::class, 'completed']);
    Route::delete('/sub/delete/{id}', [SubTaskController::class, 'delete']);

    //Theme controller routes
    Route::get('/theme', [ThemeController::class, 'index']);
    Route::get('/theme/details', [ThemeController::class, 'show']);
    Route::put('/theme/edit', [ThemeController::class, 'update']);
});

// ToDo dit in auth zetten
Route::patch('/group/link/{id}', [GroupController::class, 'createLink']);
Route::patch('/group/link', [GroupController::class, 'addUser']);

<?php


use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MainTaskController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;

// User controller routes
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/user', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);

//Group controller routes
Route::post('/group/create', [GroupController::class, 'create']);
Route::get('/group/', [GroupController::class, 'index']);
Route::get('/group/{id}', [GroupController::class, 'show']);
Route::put('/group/edit/{id}', [GroupController::class, 'edit']);
Route::delete('/group/delete/{id}', [GroupController::class, 'delete']);

//Main task controller routes
Route::post('/main/create', [MainTaskController::class, 'create']);
Route::get('/main/{id}', [MainTaskController::class, 'index']);
Route::get('/main/details/{id}', [MainTaskController::class, 'show']);
Route::put('/main/edit/{id}', [MainTaskController::class, 'edit']);
Route::delete('/main/delete/{id}', [MainTaskController::class, 'delete']);

//Sub task controller routes
Route::post('/sub/create', [SubTaskController::class, 'create']);
Route::get('/sub/', [SubTaskController::class, 'index']);
Route::get('/sub/{id}', [SubTaskController::class, 'show']);
Route::put('/sub/edit/{id}', [SubTaskController::class, 'edit']);
Route::delete('/sub/delete/{id}', [SubTaskController::class, 'delete']);

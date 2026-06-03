<?php


use App\Http\Controllers\UserController;
use App\Http\Controllers\MainTaskController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;

// User controller routes
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/user', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login']);


//Main task controller routes
Route::post('/main/create', [MainTaskController::class, 'create']);

//Group controller routes
Route::post('/group/create', [GroupController::class, 'create']);
Route::get('/group/', [GroupController::class, 'index']);
Route::get('/group/{id}', [GroupController::class, 'show']);
Route::put('/group/edit/{id}', [GroupController::class, 'edit']);



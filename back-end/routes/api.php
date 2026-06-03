<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubtaskAiController;

Route::post('/main-tasks/{id}/generate-subtasks', [SubtaskAiController::class, 'generate']);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/eventos', [EventoController::class, 'index']);
Route::post('/eventos', [EventoController::class, 'store']);
Route::get('/eventos/{id}', [EventoController::class, 'show']);
Route::post('/eventos/{id}/inscribir', [EventoController::class, 'inscribir']);
Route::put('/eventos/{id}',[EventoController::class,'edit']);
Route::get('/eventos/{id}/inscritos', [EventoController::class,'inscritos']);
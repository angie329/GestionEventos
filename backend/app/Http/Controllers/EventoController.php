<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index() {
        return Evento::all();
    }

    public function store(Request $request) {
        return Evento::create($request->all());
    }
}


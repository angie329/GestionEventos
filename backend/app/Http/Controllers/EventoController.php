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

    public function show($id) {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        return $evento;
    }
    public function inscribir(Request $request, $id) {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }
        $inscritos = \App\Models\Inscripcion::where('evento_id', $id)->count();
        
        if ($inscritos >= $evento->cupos) {
            return response()->json(['message' => 'No hay cupos disponibles'], 400);
        }

        $inscripcion = \App\Models\Inscripcion::create([
            'evento_id' => $id,
            'user_id' => $request->user_id 
        ]);

        return response()->json([
            'message' => 'Inscripción exitosa',
            'data' => $inscripcion
        ], 201);
    }
}
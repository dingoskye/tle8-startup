<?php

namespace App\Http\Controllers;

use App\Ai\Agents\SubtaskAgent;
use App\Models\MainTask;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubtaskAiController extends Controller
{
    public function generate(Request $request, MainTask $mainTask)
    {
        $request->validate([
            'niveau' => 'required',
            'deadline' => 'nullable|date',
            'context' => 'nullable|string',
        ]);

        $formData = [
            'niveau' => $request->input('niveau'),
            'deadline' => $request->input('deadline'),
            'context' => $request->input('context'),
        ];

        $prompt = '
           Genereer minimaal 8 en maximaal 20 subtaken.

    Gebruik uitsluitend:
    - de formuliergegevens hieronder
    - het gekoppelde document

    Gebruik niet:
    - de titel van de main task
    - de description van de main task
    - eigen aannames
    - externe informatie
    - functionaliteiten, eisen, technieken of werkzaamheden die niet expliciet genoemd worden

    Analyseer het niveau dat in het formulier is ingevuld.
    Gebruik uit het gekoppelde document alleen de eisen en uitleg die horen bij dat niveau en de niveaus daaronder.

    Zorg ervoor dat:
    - de subtaken samen de volledige opdracht afdekken
    - elke subtaak concreet, uitvoerbaar en resultaatgericht is
    - er geen overlap zit tussen subtaken
    - de titels actief en specifiek zijn
    - de beschrijvingen duidelijk uitleggen wat er moet worden gedaan en wat het verwachte resultaat is

    Formuliergegevens:
    ' . json_encode($formData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '

    Geef uitsluitend geldige JSON terug in exact dit formaat:

    {
        "subtasks": [
            {
                "title": "string",
                "description": "string"
            }
        ]
    }

    Retourneer geen markdown, geen codeblok, geen uitleg en geen extra tekst.
        ';

        $attachments = [];

        if ($mainTask->ai_file && Storage::exists($mainTask->ai_file)) {
            $attachments[] = storage_path('app/' . $mainTask->ai_file);
        }

        $result = (new SubtaskAgent)->prompt(
            $prompt,
            attachments: $attachments
        );

        if (!isset($result['subtasks'])) {
            return response()->json([
                'message' => 'AI gaf geen geldige subtaken terug.',
            ], 422);
        }

        if (count($result['subtasks']) < 8 || count($result['subtasks']) > 20) {
            return response()->json([
                'message' => 'AI moet tussen de 8 en 20 subtaken teruggeven.',
            ], 422);
        }

        foreach ($result['subtasks'] as $subtask) {
            if (!isset($subtask['title']) || !isset($subtask['description'])) {
                return response()->json([
                    'message' => 'Een subtaak mist title of description.',
                ], 422);
            }

            SubTask::create([
                'main_task_id' => $mainTask->id,
                'title' => $subtask['title'],
                'description' => $subtask['description'],
            ]);
        }

        return response()->json([
            'message' => 'Subtaken succesvol gegenereerd.',
            'subtasks' => $result['subtasks'],
        ]);
    }
}

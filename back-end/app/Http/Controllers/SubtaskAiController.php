<?php

namespace App\Http\Controllers;

use App\Models\MainTask;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class SubtaskAiController extends Controller
{

    public function generate(Request $request, MainTask $mainTask)
    {

//        return response()->json([
//            'message' => 'Ik zit in de juiste generate functie',
//            'controller' => 'SubtaskAiController',
//        ], 418);

        $request->validate([
            'niveau' => 'required',
            'context' => 'nullable|string',
        ]);

        $formData = [
            'niveau' => $request->input('niveau'),
            'context' => $request->input('context'),
        ];

        if (!$mainTask->ai_file) {
            return response()->json([
                'message' => 'Deze hoofdtaak heeft geen ai_file in de database.',
                'main_task_id' => $mainTask->id,
            ], 422);
        }

        if (!Storage::disk('public')->exists($mainTask->ai_file)) {
            return response()->json([
                'message' => 'Het gekoppelde AI-bestand bestaat niet op de public disk.',
                'main_task_id' => $mainTask->id,
                'ai_file' => $mainTask->ai_file,
                'expected_path' => Storage::disk('public')->path($mainTask->ai_file),
            ], 422);
        }

        $documentContent = Storage::disk('public')->get($mainTask->ai_file);
//        if (!$mainTask->ai_file || !Storage::disk('public')->exists($mainTask->ai_file)) {
//            return response()->json([
//                'message' => 'Er is geen gekoppeld AI-bestand gevonden voor deze hoofdtaak.',
//                'ai_file' => $mainTask->ai_file,
//            ], 422);
//        }
//
//        $documentContent = Storage::disk('public')->get($mainTask->ai_file);



        $systemPrompt =  '
        Je bent een ervaren projectplanner en werkvoorbereider.

        Je taak is om op basis van de informatie die in het formulier is ingevuld en de inhoud van het gekoppelde document een logische opsplitsing van het werk te maken in subtaken.

        Gebruik uitsluitend informatie uit:
        - het formulier
        - het gekoppelde document

        Gebruik NIET:
        - de titel van de hoofdtaak
        - de beschrijving van de hoofdtaak
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

        Maak minimaal 8 en maximaal 20 subtaken.

        Elke subtaak bevat alleen:
        - title
        - description

        Geef uitsluitend geldige JSON terug.
        Retourneer geen markdown.
        Retourneer geen codeblok.
        Retourneer geen uitleg.
        Retourneer geen extra tekst.

        Gebruik exact dit JSON-formaat:

        {
            "subtasks": [
                {
                    "title": "string",
                    "description": "string"
                }
            ]
        }
    ';

        $userPrompt = '
            Formuliergegevens:
            ' . json_encode($formData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '

            Gekoppeld document:
            ' . $documentContent;

        $endpoint = rtrim(env('AZURE_OPENAI_ENDPOINT'), '/');
        $deployment = env('AZURE_OPENAI_DEPLOYMENT');
        $apiVersion = env('AZURE_OPENAI_API_VERSION', '2024-02-15-preview');

        $response = Http::withHeaders([
            'api-key' => env('AZURE_OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post(
            "{$endpoint}/openai/deployments/{$deployment}/chat/completions?api-version={$apiVersion}",
            [
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $systemPrompt,
                    ],
                    [
                        'role' => 'user',
                        'content' => $userPrompt,
                    ],
                ],
                'temperature' => 0.2
            ]
        );

        if (!$response->successful()) {
            return response()->json([
                'message' => 'Azure OpenAI request mislukt.',
                'error' => $response->json(),
            ], 500);
        }

        $content = $response->json('choices.0.message.content');

//        $content = trim($content);
//        $content = str_replace(['```json', '```'], '', $content);
//        $content = trim($content);

        $result = json_decode($content, true);

        if (!$result || !isset($result['subtasks'])) {
            return response()->json([
                'message' => 'AI gaf geen geldige subtaken terug.',
                'raw' => $content,
            ], 422);
        }

        if (count($result['subtasks']) < 8 || count($result['subtasks']) > 20) {
            return response()->json([
                'message' => 'AI moet tussen de 8 en 20 subtaken teruggeven.',
                'subtasks' => $result['subtasks'],
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
                'user_id' => $request->user_id,
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
//
//use App\Ai\Agents\SubtaskAgent;
//use App\Models\MainTask;
//use App\Models\SubTask;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Storage;
//
//class SubtaskAiController extends Controller
//{
//    public function generate(Request $request, MainTask $mainTask)
//    {
////        dd(config('ai'));
//        $request->validate([
//            'niveau' => 'required',
//            'context' => 'string',
//        ]);
//
//        $formData = [
//            'niveau' => $request->input('niveau'),
//            'context' => $request->input('context'),
//        ];
//
//        $prompt = '
//           Genereer minimaal 8 en maximaal 20 subtaken.
//
//    Gebruik uitsluitend:
//    - de formuliergegevens hieronder
//    - het gekoppelde document
//
//    Gebruik niet:
//    - de titel van de main task
//    - de description van de main task
//    - eigen aannames
//    - externe informatie
//    - functionaliteiten, eisen, technieken of werkzaamheden die niet expliciet genoemd worden
//
//    Analyseer het niveau dat in het formulier is ingevuld.
//    Gebruik uit het gekoppelde document alleen de eisen en uitleg die horen bij dat niveau en de niveaus daaronder.
//
//    Zorg ervoor dat:
//    - de subtaken samen de volledige opdracht afdekken
//    - elke subtaak concreet, uitvoerbaar en resultaatgericht is
//    - er geen overlap zit tussen subtaken
//    - de titels actief en specifiek zijn
//    - de beschrijvingen duidelijk uitleggen wat er moet worden gedaan en wat het verwachte resultaat is
//
//    Formuliergegevens:
//    ' . json_encode($formData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . '
//
//    Geef uitsluitend geldige JSON terug in exact dit formaat:
//
//    {
//        "subtasks": [
//            {
//                "title": "string",
//                "description": "string"
//            }
//        ]
//    }
//
//    Retourneer geen markdown, geen codeblok, geen uitleg en geen extra tekst.
//        ';
//
//        $attachments = [];
//
//        if ($mainTask->ai_file && Storage::exists($mainTask->ai_file)) {
//            $attachments[] = storage_path('app/' . $mainTask->ai_file);
//        }
//
//        $result = (new SubtaskAgent)->prompt(
//            $prompt,
//            attachments: $attachments
//        );
//
//        if (!isset($result['subtasks'])) {
//            return response()->json([
//                'message' => 'AI gaf geen geldige subtaken terug.',
//            ], 422);
//        }
//
//        if (count($result['subtasks']) < 8 || count($result['subtasks']) > 20) {
//            return response()->json([
//                'message' => 'AI moet tussen de 8 en 20 subtaken teruggeven.',
//            ], 422);
//        }
//
//        foreach ($result['subtasks'] as $subtask) {
//            if (!isset($subtask['title']) || !isset($subtask['description'])) {
//                return response()->json([
//                    'message' => 'Een subtaak mist title of description.',
//                ], 422);
//            }
//
//            SubTask::create([
//                'main_task_id' => $mainTask->id,
//                'title' => $subtask['title'],
//                'description' => $subtask['description'],
//            ]);
//        }
//
//        return response()->json([
//            'message' => 'Subtaken succesvol gegenereerd.',
//            'subtasks' => $result['subtasks'],
//        ]);
//    }
//}

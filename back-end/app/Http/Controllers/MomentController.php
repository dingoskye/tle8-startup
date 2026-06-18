<?php

namespace App\Http\Controllers;

use App\Models\Moment;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Tymon\JWTAuth\Facades\JWTAuth;

class MomentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;

        return Moment::with(['group'])
        ->whereHas('group.users', function ($query) use ($userId) {
            $query->where('users.id', $userId);
        })
            ->orderBy('date', 'asc')
            ->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            if (!$request->date || !$request->location || !$request->description || !$request->group_id) {
                return response(['error' => 'Missing required fields: date, location, description, or group_id'], 400);
            }

            // We checken voor de zekerheid of de user wel in de groep zit waarvoor hij iets aanmaakt
            $userId = JWTAuth::parseToken()->authenticate()->id;

            $moment = new Moment([
                'date' => $request->date,
                'location' => $request->location,
                'description' => $request->description,
                'group_id' => $request->group_id,
            ]);

            $moment->save();

            return $moment;

        } catch (ModelNotFoundException $e) {
            return response(['error' => $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $moment = Moment::findOrFail($id);

            return response()->json($moment, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Moment niet gevonden'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server fout: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, Request $request)
    {
        try {
            // We laden de group.users mee om de rechten te kunnen checken
            $moment = Moment::with('group.users')->findOrFail($id);
            $userId = JWTAuth::parseToken()->authenticate()->id;

            // Check of de ingelogde user in de groep van dit moment zit
            if ($moment->group->users->contains('id', $userId)) {
                $moment->update([
                    'date' => $request->date ?? $moment->date,
                    'location' => $request->location ?? $moment->location,
                    'description' => $request->description ?? $moment->description,
                    'group_id' => $request->group_id ?? $moment->group_id,
                ]);

                $moment->save();

                return $moment;
            } else {
                return response()->json(['error' => 'you are not authorized'], 403);
            }

        } catch (ModelNotFoundException $e) {
            return response(['error' => 'Moment not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        try {
            $userId = JWTAuth::parseToken()->authenticate()->id;
            $moment = Moment::with('group.users')->findOrFail($id);

            // Check of de ingelogde user in de groep van dit moment zit
            if ($moment->group->users->contains('id', $userId)) {
                $moment->delete();
                return response()->json(['message' => 'Moment deleted successfully']);
            } else {
                return response()->json(['error' => 'you are not authorized'], 403);
            }
        } catch (ModelNotFoundException $e) {
            return response(['error' => 'Moment not found'], 404);
        }
    }
}

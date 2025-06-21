<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Production;

class ProductionController extends Controller
{
    /**
     * Display a listing of the production records.
     */
    public function index()
    {
        $productions = Production::all();
        return response()->json($productions);
    }

    /**
     * Store a newly created production record.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id'   => 'required|exists:products,id',
            'quantity'     => 'required|integer|min:1',
            'produced_at'  => 'required|date',
            // Add other fields as needed
        ]);

        $production = Production::create($validated);

        return response()->json($production, 201);
    }

    /**
     * Display the specified production record.
     */
    public function show($id)
    {
        $production = Production::findOrFail($id);
        return response()->json($production);
    }

    /**
     * Update the specified production record.
     */
    public function update(Request $request, $id)
    {
        $production = Production::findOrFail($id);

        $validated = $request->validate([
            'product_id'   => 'sometimes|required|exists:products,id',
            'quantity'     => 'sometimes|required|integer|min:1',
            'produced_at'  => 'sometimes|required|date',
            // Add other fields as needed
        ]);

        $production->update($validated);

        return response()->json($production);
    }

    /**
     * Remove the specified production record.
     */
    public function destroy($id)
    {
        $production = Production::findOrFail($id);
        $production->delete();

        return response()->json(['message' => 'Production record deleted successfully']);
    }
}
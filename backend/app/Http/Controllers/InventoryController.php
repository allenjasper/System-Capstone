<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;

class InventoryController extends Controller
{
    /**
     * Display a listing of the inventory items.
     */
    public function index()
    {
        $items = Inventory::all();
        return response()->json($items);
    }

    /**
     * Store a newly created inventory item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity'    => 'required|integer|min:0',
        ]);

        $item = Inventory::create($validated);

        return response()->json($item, 201);
    }

    /**
     * Display the specified inventory item.
     */
    public function show($id)
    {
        $item = Inventory::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified inventory item.
     */
    public function update(Request $request, $id)
    {
        $item = Inventory::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'quantity'    => 'sometimes|required|integer|min:0',
        ]);

        $item->update($validated);

        return response()->json($item);
    }

    /**
     * Remove the specified inventory item.
     */
    public function destroy($id)
    {
        $item = Inventory::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Inventory item deleted successfully']);
    }
}
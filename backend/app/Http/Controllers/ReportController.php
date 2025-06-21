<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\Production;
use App\Models\Inventory;

class ReportController extends Controller
{
    /**
     * Get sales report (orders summary).
     */
    public function salesReport(Request $request)
    {
        $orders = Order::with('user')->get();
        $totalSales = $orders->sum('total_amount');
        return response()->json([
            'total_sales' => $totalSales,
            'orders' => $orders
        ]);
    }

    /**
     * Get inventory report.
     */
    public function inventoryReport(Request $request)
    {
        $inventory = Inventory::all();
        return response()->json($inventory);
    }

    /**
     * Get production report.
     */
    public function productionReport(Request $request)
    {
        $productions = Production::with('product')->get();
        return response()->json($productions);
    }

    /**
     * Get product report.
     */
    public function productReport(Request $request)
    {
        $products = Product::all();
        return response()->json($products);
    }
}
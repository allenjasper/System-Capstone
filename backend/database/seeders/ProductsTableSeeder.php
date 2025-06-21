<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Alkansya',
            'description' => 'A traditional Filipino coin bank.',
            'price' => 150.00,
            'stock' => 100,
        ]);
    }
}
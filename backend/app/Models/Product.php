<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        // Add other fields as needed
    ];

    // Add relationships if needed, e.g. to orders or productions
}
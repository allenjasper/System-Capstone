<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'produced_at',
        // Add other fields as needed
    ];

    /**
     * Get the product associated with the production record.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
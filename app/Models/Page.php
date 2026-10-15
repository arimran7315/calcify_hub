<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    public $guarded = [];
    protected $casts = [
        'data' => 'array', // Laravel will handle JSON conversion automatically
    ];
}

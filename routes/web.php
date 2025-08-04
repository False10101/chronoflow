<?php

use Illuminate\Support\Facades\Route;

// This route will catch any non-API request and load the 'app' view.
// Your React application will be mounted in this view.
Route::get('/{any}', function () {
    return view('app'); // Assuming your main Blade file is app.blade.php
})->where('any', '.*');
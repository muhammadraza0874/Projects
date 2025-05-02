<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->role !=='executive') {

            $response = [
                'success' => false,
                'message' => "You don't have permission to access. Only Executive can access it.",
                "data" => []
            ];
            return response()->json($response, 422);
        }

        return $next($request);
    }
}

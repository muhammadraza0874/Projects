<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            $response = [
                'success' => false,
                'message' => 'Unauthorized',
                "data" => []
            ];
            return response()->json($response, 401);
        }

        $user = User::where('auth_token', $token)->first();

        if (!$user) {
            $response = [
                'success' => false,
                'message' => 'Invalid token',
                "data" => []
            ];
            return response()->json($response, 422);
        }

        Auth::login($user);
        return $next($request);
    }


}

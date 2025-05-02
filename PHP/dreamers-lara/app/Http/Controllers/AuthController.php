<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserLoginResource;
use App\Http\Resources\UserRegisterResource;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $data = new UserRegisterResource($user);

        return $this->sendResponse('User created Successfully!', $data);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $user = User::where('email', $request->email)->first();

        if ($user){
            if (!$user || !Hash::check($request->password, $user->password)) {
                return $this->sendError('Invalid credentials');
            }

            $token = $user->id . Str::random(60);
            $user->auth_token = $token;
            $user->auth_token_issued_at = now();
            $user->last_usage_at = Carbon::now()->addWeeks(2);
            $user->save();

            $data = new UserLoginResource($user);
            return $this->sendResponse('User Logged in Successfully!', $data);
        } else {
            return $this->sendError('Please enter valid credentials');
        }

    }

    public function logout(Request $request)
    {
        $user_id = auth()->id();
        $user = User::where('id', $user_id)->first();
        if ($user) {
            $user->auth_token = null;
            $user->auth_token_issued_at = null;
            $user->last_usage_at = null;
            $user->save();
            return $this->sendResponse('User Logged out Successfully!');
        } else {
            return $this->sendError('User does not exist.');
        }
    }
}

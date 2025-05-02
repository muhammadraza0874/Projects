<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function sendResponse($message, $result = [])
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $result,
        ];
        return response()->json($response, 200);
    }

    public function sendError($error, $dataError = [], $code = 422)
    {
        $response = [
            'success' => false,
            'message' => $error,
            "data" => $dataError
        ];
        return response()->json($response, $code);
    }
}

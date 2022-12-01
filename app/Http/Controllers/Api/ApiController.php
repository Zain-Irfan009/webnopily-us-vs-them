<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function response($result=[],$responseCode=200){
        $data['result']= $result;
        $data['status'] = $responseCode;
        return response()->json($data);
    }
}

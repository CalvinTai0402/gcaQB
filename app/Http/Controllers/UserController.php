<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = $request->input("filter");
        $count = User::count();
        if ((!is_null(json_decode($filter))) && gettype(json_decode($filter)) != "integer") {
            if (property_exists((json_decode($filter)), "id")) {
                $ids = json_decode($filter)->id;
                $users = User::find($ids);
                return $users;
            }
        }
        $field = $request->input("field");
        $order = $request->input("order");
        $page = $request->input("page");
        $perPage = $request->input("perPage");
        $toSkip = ($page - 1) * $perPage;
        $users = User::name($filter)
            ->email($filter)
            ->phone($filter)
            ->website($filter)
            ->company($filter)
            ->order($field, $order)
            ->skipPage($toSkip)
            ->take($perPage)
            ->get();
        $countAndUsers = json_encode(array($count, $users));
        return response($countAndUsers, 200)
            ->header('X-Total-Count', $count)
            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function destroyMany(Request $request)
    {
        $filter = $request->input("filter");
        $filter = json_decode($filter);
        $ids = trim(json_encode($filter->id), "[]"); // $ids is of the string type
        $usersToDelete = User::whereIn('id', explode(",", $ids))->get();
        User::whereIn('id', explode(",", $ids))->delete();
        return response()->json($usersToDelete, 200);
    }
}

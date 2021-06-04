<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = $request->input("filter");
        $count = Customer::count();
        if ((!is_null(json_decode($filter))) && gettype(json_decode($filter)) != "integer") {
            if (property_exists((json_decode($filter)), "id")) {
                $ids = json_decode($filter)->id;
                $users = Customer::find($ids);
                return $users;
            }
        }
        $field = $request->input("field");
        $order = $request->input("order");
        $page = $request->input("page");
        $perPage = $request->input("perPage");
        $toSkip = ($page - 1) * $perPage;
        $customers = Customer::name($filter)
            ->email($filter)
            ->phone($filter)
            ->website($filter)
            ->company($filter)
            ->order($field, $order)
            ->skipPage($toSkip)
            ->take($perPage)
            ->get();
        $countAndCustomers = json_encode(array($count, $customers));
        return response($countAndCustomers, 200)
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
        $customer = Customer::create($request->all());

        return response()->json($customer, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return $customer;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->all());

        return response()->json($customer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        if ($customer->delete()) {
            return response()->json(["status" => 204]);
        }
    }

    public function destroyMany(Request $request)
    {
        $filter = $request->input("filter");
        $filter = json_decode($filter);
        $ids = trim(json_encode($filter->id), "[]"); // $ids is of the string type
        $usersToDelete = Customer::whereIn('id', explode(",", $ids))->get();
        Customer::whereIn('id', explode(",", $ids))->delete();
        return response()->json($usersToDelete, 200);
    }
}

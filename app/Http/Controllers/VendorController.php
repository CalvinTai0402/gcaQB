<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = $request->input("filter");
        $count = Vendor::count();
        if ((!is_null(json_decode($filter))) && gettype(json_decode($filter)) != "integer") {
            if (property_exists((json_decode($filter)), "id")) {
                $ids = json_decode($filter)->id;
                $users = Vendor::find($ids);
                return $users;
            }
        }
        $field = $request->input("field");
        $order = $request->input("order");
        $page = $request->input("page");
        $perPage = $request->input("perPage");
        $toSkip = ($page - 1) * $perPage;
        $vendors = Vendor::name($filter)
            ->email($filter)
            ->phone($filter)
            ->website($filter)
            ->company($filter)
            ->order($field, $order)
            ->skipPage($toSkip)
            ->take($perPage)
            ->get();
        $countAndVendors = json_encode(array($count, $vendors));
        return response($countAndVendors, 200)
            ->header('X-Total-Count', $count)
            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vendor = Vendor::create($request->all());

        return response()->json($vendor, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function show(Vendor $vendor)
    {
        return $vendor;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        $vendor->update($request->all());

        return response()->json($vendor, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        if ($vendor->delete()) {
            return response()->json(['status' => 204]);
        }
    }

    public function destroyMany(Request $request)
    {
        $filter = $request->input("filter");
        $filter = json_decode($filter);
        $ids = trim(json_encode($filter->id), "[]"); // $ids is of the string type
        $vendorsToDelete = Vendor::whereIn('id', explode(",", $ids))->get();
        Vendor::whereIn('id', explode(",", $ids))->delete();
        return response()->json($vendorsToDelete, 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $count = Post::count();
        $field = $request->input("field");
        $order = $request->input("order");
        $filter = $request->input("filter");
        $page = $request->input("page");
        $perPage = $request->input("perPage");
        $toSkip = ($page - 1) * $perPage;
        // $posts = Post::where('title','LIKE','%'.$filter.'%')
        //                 ->orWhere('body','LIKE','%'.$filter.'%')
        //                 ->orderBy($field, $order)->skip($toSkip)->take($perPage)->get();
        $posts = Post::name($filter)
            ->body($filter)
            ->title($filter)
            ->order($field, $order)
            ->skip($toSkip)
            ->take($perPage)
            ->get();
        $countAndPosts = json_encode(array($count, $posts));
        return response($countAndPosts, 200)
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
        $post = Post::create($request->all());

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());

        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if ($post) {
            $post->delete();
        } else {
            return response()->json(array(), 200);
        }
        return response()->json(null, 204);
    }

    public function destroyMany(Request $request)
    {
        $filter = $request->input("filter");
        $filter = json_decode($filter);
        $ids = trim(json_encode($filter->id), "[]"); // $ids is of the string type
        $postsToDelete = Post::whereIn('id', explode(",", $ids))->get();
        Post::whereIn('id', explode(",", $ids))->delete();
        return response()->json($postsToDelete, 200);
    }
}

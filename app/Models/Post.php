<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'published_at',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo("App\Models\User");
    }

    public function scopeTitle($query, $filter)
    {
        if (!is_null($filter)) {
            // $js_code = 'console.log(' . json_encode($filter, JSON_HEX_TAG) . ');';
            // $js_code = '<script>' . $js_code . '</script>';
            // echo $js_code;
            return $query->orWhere('title', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopeBody($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('body', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopeName($query, $filter)
    {
        if (!is_null($filter)) {
            $user_ids = User::name($filter)->pluck('id')->toArray();
            $user_ids = trim(json_encode($user_ids), "[]");
            return $query->whereIn('user_id',explode(",",$user_ids));
        }

        return $query;
    }

    public function scopeOrder($query, $field, $order)
    {
        if (!is_null($field)) {
            return $query->orderBy($field, $order);
        }

        return $query;
    }
}

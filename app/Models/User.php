<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function post(){
        return $this->hasOne("App\Models\Post");
    }

    public function scopeName($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->where('name', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopeEmail($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('email', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopePhone($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('phone', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopeWebsite($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('website', 'LIKE', '%'.$filter.'%');
        }

        return $query;
    }

    public function scopeCompany($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('company_name', 'LIKE', '%'.$filter.'%');
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

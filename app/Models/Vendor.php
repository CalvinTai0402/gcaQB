<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'company',
        'email',
        'phone',
        'mobile',
        'fax',
        'other',
        'website',
        'address',
        'notes',
        'billing_rate',
        'account_no',
        'business_id'
    ];

    public function scopeName($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->where('first_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('last_name', 'LIKE', '%' . $filter . '%');
        }

        return $query;
    }

    public function scopeEmail($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('email', 'LIKE', '%' . $filter . '%');
        }

        return $query;
    }

    public function scopePhone($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('phone', 'LIKE', '%' . $filter . '%');
        }

        return $query;
    }

    public function scopeWebsite($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('website', 'LIKE', '%' . $filter . '%');
        }

        return $query;
    }

    public function scopeCompany($query, $filter)
    {
        if (!is_null($filter)) {
            return $query->orWhere('company', 'LIKE', '%' . $filter . '%');
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

    public function scopeSkipPage($query, $toSkip)
    {
        if ($toSkip != 0) {
            return $query->skip($toSkip);
        }

        return $query;
    }
}

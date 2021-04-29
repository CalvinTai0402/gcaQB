<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CustomerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->title,
            'first_name' => $this->faker->name,
            'last_name' => $this->faker->lastName,
            'suffix' => $this->faker->suffix,
            'company' => Str::random(10),
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'mobile' => $this->faker->phoneNumber,
            'fax' => "71937729",
            'website' => $this->faker->unique()->safeEmail,
            'address' => $this->faker->address,
        ];
    }
}

<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $roles = ['executive', 'manager', 'associate', 'advisor'];

        $users = [];
        for ($i = 1; $i <= 10; $i++) { // Create 10 users
            $name = $faker->name; // Generate a random full name
            $email = strtolower(str_replace(' ', '.', $name)) . '@example.com';

            $users[] = [
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password123'),
                'role' => $roles[array_rand($roles)], // Random role
                'auth_token' => null,
                'auth_token_issued_at' => null,
                'last_usage_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('users')->insert($users);
    }
}

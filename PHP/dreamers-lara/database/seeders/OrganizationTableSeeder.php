<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class OrganizationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $userIds = User::where('role', 'executive')->pluck('id')->toArray();
        $organizations = [];
        for ($i = 1; $i <= 10; $i++) {
            $organizations[] = [
                'name' => $faker->company,
                'description' => null,
                'created_by' => $faker->randomElement($userIds),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('organizations')->insert($organizations);
    }
}

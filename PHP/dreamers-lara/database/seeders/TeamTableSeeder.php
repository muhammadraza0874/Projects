<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;
use App\Models\User;
use App\Models\Organization;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Fetch all necessary user IDs based on role
        $executives = User::where('role', 'executive')->pluck('id')->toArray();
        $managers = User::where('role', 'manager')->pluck('id')->toArray();
        $associates = User::where('role', 'associate')->pluck('id')->toArray();
        $organizations = Organization::pluck('id')->toArray();

        $teams = [];
        for ($i = 1; $i <= 10; $i++) { // Create 10 random teams
            $teams[] = [
                'name' => $faker->company . ' Team',
                'manager_id' => $faker->randomElement($managers), // Random manager
                'associate_ids' => json_encode($faker->randomElements($associates, rand(2, 5))), // 2-5 random associates
                'organization_id' => $faker->randomElement($organizations), // Random organization
                'created_by' => $faker->randomElement($executives), // Random executive
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('teams')->insert($teams);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ProjectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get all executives (who can create projects)
        $executives = User::where('role', 'executive')->pluck('id')->toArray();

        // Get all advisors (some projects may have an advisor)
        $advisors = User::where('role', 'advisor')->pluck('id')->toArray();

        $projects = [];

        for ($i = 1; $i <= 10; $i++) {
            $projects[] = [
                'name' => $faker->sentence(3), // Random project name
                'description' => $faker->paragraph(), // Random description
                'advisor_id' => $faker->randomElement(array_merge($advisors, [null])), // Advisor or null
                'created_by' => $faker->randomElement($executives), // Created by an executive
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        Project::insert($projects);

    }
}

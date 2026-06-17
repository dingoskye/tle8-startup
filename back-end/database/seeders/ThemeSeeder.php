<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Theme;

class ThemeSeeder extends Seeder
{
    private array $themes = [
        'default', 'natural', 'dark',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach ($this->themes as $theme) {
            Theme::create([
                'name' => $theme,
            ]);
        }
    }
}

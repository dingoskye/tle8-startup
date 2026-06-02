<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_main_task', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('progress');
            $table->string('level');
            $table->integer('score')->nullable();
            $table->boolean('completed')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_main_task');
    }
};

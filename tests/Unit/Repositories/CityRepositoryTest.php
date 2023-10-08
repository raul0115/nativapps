<?php

namespace Tests\Unit\Repositories;


use Tests\TestCase;
use App\Models\City;
use App\Repositories\CityRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CityRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $cityRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->cityRepository = new CityRepository(new City());
    }


    /** @test */
    public function it_can_find_all_city()
    {
        City::factory()->count(3)->create();

        $cities = $this->cityRepository->all();

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $cities);
        $this->assertCount(3, $cities);
    }


}






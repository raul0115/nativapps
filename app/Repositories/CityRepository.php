<?php

namespace App\Repositories;

use App\Models\City;
use Illuminate\Support\Collection;

class CityRepository implements CityRepositoryInterface
{
    protected $model;

    public function __construct(City $model)
    {
        $this->model = $model;
    }

    public function all():Collection
    {
        return $this->model->all();
    }


}

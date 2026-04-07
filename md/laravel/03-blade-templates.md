# Template Blade

## Pengenalan Blade

Blade adalah **engine templating** yang powerful dari Laravel. Blade memungkinkan kamu menggunakan kode PHP dalam template sambil menjaga sintaks tetap bersih.

## Menampilkan Data

```blade
{{-- Menampilkan variabel --}}
{{ $variable }}

{{-- Menampilkan dengan fungsi --}}
{{ strtoupper($name) }}

{{-- Menampilkan HTML raw --}}
{!! $htmlContent !!}

{{-- Menampilkan dengan default --}}
{{ $name ?? 'Guest' }}
```

## Control Structures

### If-Else

```blade
@if($condition)
    <p>Kondisi benar</p>
@elseif($anotherCondition)
    <p>Kondisi lain</p>
@else
    <p>Kondisi salah</p>
@endif
```

### Loops (Perulangan)

```blade
{{-- Foreach --}}
@foreach($items as $item)
    <li>{{ $item }}</li>
@endforeach

{{-- For --}}
@for($i = 0; $i < 10; $i++)
    <p>Angka: {{ $i }}</p>
@endfor

{{-- While --}}
@while($condition)
    <p>Perulangan...</p>
@endwhile
```

## Layout dengan @yield

### Layout Dasar (layouts/app.blade.php)

```blade
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title', 'Aplikasi Saya')</title>
    @stack('styles')
</head>
<body>
    @include('partials.navbar')

    <div class="container">
        @yield('content')
    </div>

    @stack('scripts')
</body>
</html>
```

### Child View

```blade
@extends('layouts.app')

@section('title', 'Halaman Utama')

@section('content')
    <h1>Selamat Datang!</h1>
    <p>Ini adalah halaman utama.</p>
@endsection

@push('styles')
    <link rel="stylesheet" href="style.css">
@endpush
```

## Components

### Membuat Components

```bash
php artisan make:component Alert
```

### Menggunakan Components

```blade
<x-alert type="success" message="Operasi berhasil!" />

{{-- Dengan slot --}}
<x-card>
    <x-slot name="header">
        <h2>Judul Card</h2>
    </x-slot>

    <p>Isi card di sini...</p>
</x-card>
```

## Includes

```blade
{{-- Include sebuah view --}}
@include('partials.header')

{{-- Include dengan data --}}
@include('view.name', ['data' => $data])

{{-- Include jika ada --}}
@includeIf('partials.header')

{{-- Include ketika kondisi benar --}}
@includeWhen($condition, 'partials.header')
```

@extends('master.layout')

@if (Route::currentRouteName() == 'home.locale' || Route::currentRouteName() == 'home')
@include('tools.home')
@endif

@if (Route::currentRouteName() == 'age-calculator')
@include('tools.ageCalculator')
@endif

@if (Route::currentRouteName() == 'tax-calculator')
@include('tools.taxCalculator')
@endif

@if (Route::currentRouteName() == 'budget-calculator'|| Route::currentRouteName() == 'budget-calculator.locale')
@include('tools.budgetCalculator')
@endif

@if (Route::currentRouteName() == 'solar-calculator' || Route::currentRouteName() == 'solar-calculator.locale')
@include('tools.usagesolarCalculator')
@endif

@if (Route::currentRouteName() == 'construction-calculator')
@include('tools.constructionCostCalculator')
@endif

@if (Route::currentRouteName() == 'text-formater')
@include('tools.textFormater')
@endif

@if (Route::currentRouteName() == 'text-encoder')
@include('tools.textEncoder')
@endif

@if (Route::currentRouteName() == 'image-converter')
@include('tools.imageConverter')
@endif

@if (Route::currentRouteName() == 'docs-convertor')
@include('tools.docsConvertor')
@endif

@if (Route::currentRouteName() == 'minifier')
@include('tools.minifier')
@endif

@if (Route::currentRouteName() == 'un-minifier')
@include('tools.unMinifier')
@endif

@if (Route::currentRouteName() == 'compare-text')
@include('tools.compareText')
@endif

@if (Route::currentRouteName() == 'generate-pdf')
@include('tools.generatePdf')
@endif

@if (Route::currentRouteName() == 'image-text')
@include('tools.imageText')
@endif

@if (Route::currentRouteName() == 'merge-pdf')
@include('tools.mergePdf')
@endif
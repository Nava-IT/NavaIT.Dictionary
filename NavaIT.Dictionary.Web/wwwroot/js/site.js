// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function onSearchSubmit() {
    var textVal = document.getElementById("term").value;
    var formAction = document.getElementById("searchform").getAttribute("action");
    window.location.href = formAction + "/" + textVal;
    return false;
}
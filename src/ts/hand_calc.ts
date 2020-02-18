export function calculate(event: KeyboardEvent) {
    if (event.keyCode === 13) {
        var x = <HTMLInputElement>document.getElementById("hand");
        alert(x.value);
    }
}
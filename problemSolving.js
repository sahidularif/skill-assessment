const rotateLeft = (arr, rotLeft) => {
    const leftPass = [...arr.slice(rotLeft), ...arr.slice(0, rotLeft)];
    return leftPass
}


console.log(rotateLeft([1, 2, 3, 4, 5], 4));
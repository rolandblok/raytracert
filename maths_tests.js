function relative_equal(a, b, delta, assert, message) {
    let relative_delta = Math.abs((a-b)/b);
    assert.ok(relative_delta < delta, "Relative equality |" + relative_delta + "| < " + delta + ": " + message);
}

QUnit.test( "Quadratic no solutions", function( assert ) {
    let no_solutions = solve_quadratic(1.0, 0.0, 1.0);
    assert.equal(0, no_solutions.length, 'No root for x^2+1')
});

QUnit.test( "Quadratic one solution", function( assert ) {
    let one_solution = solve_quadratic(1.0, -2.0, 1.0);
    assert.equal(1, one_solution.length, '1 root for root for x^2-2x+1')
    relative_equal(one_solution[0], 1.0, 1e-10, assert, 'Root is equal to 1.0');
});

QUnit.test( "Quadratic two solution", function( assert ) {
    let two_solutions = solve_quadratic(1.0, 0.0, -1.0);
    assert.equal(2, two_solutions.length, '2 roots for root for x^2-1');
    for (var i=0; i<2; i++) {
        let solution = two_solutions[i];
        if (solution < 0.0) {
            relative_equal(solution, -1.0, 1e-10, assert, 'Root is equal to -1.0');
        } else {
            relative_equal(solution, 1.0, 1e-10, assert, 'Root is equal to 1.0');
        }
    }
});

